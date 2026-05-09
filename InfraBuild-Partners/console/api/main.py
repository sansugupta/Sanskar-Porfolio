"""
InfraBuild Management Console — Backend API
FastAPI server powering the management console at infrabuildpartners.com/console
"""
import os, sys, json
from datetime import datetime
from io import BytesIO
from typing import Optional

from fastapi import FastAPI, HTTPException, Depends, Request, UploadFile, File, Form
from fastapi.responses import JSONResponse, StreamingResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from auth import verify_password, create_access_token, verify_token
from agents.lead_finder import find_leads, generate_excel, BUSINESS_CATEGORIES
from agents.job_applier import process_resume_and_find_jobs, generate_jobs_excel
from agents.content_creator import generate_post, generate_weekly_calendar

app = FastAPI(title="InfraBuild Management Console API", version="1.0.0", docs_url=None)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://infrabuildpartners.com", "http://localhost:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_token(request: Request) -> str:
    """Extract and validate JWT token from cookie or header."""
    token = request.cookies.get("console_token") or \
            request.headers.get("Authorization", "").replace("Bearer ", "")
    if not token or not verify_token(token):
        raise HTTPException(status_code=401, detail="Not authenticated")
    return token


# ─── Models ───────────────────────────────────────────

class LoginRequest(BaseModel):
    password: str

class LeadFinderRequest(BaseModel):
    category: str
    country: str = "USA"
    count: int = 30

class ContentRequest(BaseModel):
    service_index: Optional[int] = None
    custom_topic: Optional[str] = None


# ─── Auth ─────────────────────────────────────────────

@app.post("/api/auth/login")
async def login(payload: LoginRequest):
    if not verify_password(payload.password):
        raise HTTPException(status_code=401, detail="Invalid password")
    token = create_access_token()
    response = JSONResponse({"success": True, "token": token})
    response.set_cookie("console_token", token, httponly=True, secure=True, samesite="strict", max_age=43200)
    return response


@app.post("/api/auth/verify")
async def verify(request: Request):
    token = request.cookies.get("console_token") or request.headers.get("Authorization", "").replace("Bearer ", "")
    if not token or not verify_token(token):
        raise HTTPException(status_code=401, detail="Invalid token")
    return {"success": True}


# ─── Dashboard ────────────────────────────────────────

@app.get("/api/dashboard")
async def dashboard(request: Request):
    get_token(request)
    return {
        "status": "online",
        "server_time": datetime.now().isoformat(),
        "agents": {
            "lead_finder": {"status": "ready", "categories": list(BUSINESS_CATEGORIES.keys())},
            "job_applier": {"status": "ready"},
            "content_creator": {"status": "ready"},
        },
    }


# ─── Lead Finder ──────────────────────────────────────

@app.post("/api/leads/find")
async def api_find_leads(payload: LeadFinderRequest, request: Request):
    get_token(request)
    result = find_leads(category=payload.category, country=payload.country, count=min(payload.count, 100))
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    return result


@app.post("/api/leads/excel")
async def api_leads_excel(payload: LeadFinderRequest, request: Request):
    get_token(request)
    result = find_leads(category=payload.category, country=payload.country, count=min(payload.count, 100))
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    excel_bytes = generate_excel(result["leads"], payload.category, payload.country)
    filename = f"InfraBuild_Leads_{payload.category}_{payload.country}_{datetime.now().strftime('%Y%m%d')}.xlsx"
    return StreamingResponse(
        excel_bytes,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={"Content-Disposition": f'attachment; filename="{filename}"'}
    )


# ─── Job Application ──────────────────────────────────

@app.post("/api/jobs/search")
async def api_search_jobs(
    request: Request,
    count: int = Form(30),
    resume: UploadFile = File(None),
    resume_text: str = Form(None),
):
    get_token(request)
    text_content = resume_text or ""
    if resume:
        content = await resume.read()
        try: text_content = content.decode('utf-8')
        except UnicodeDecodeError: text_content = content.decode('utf-8', errors='ignore')
    if not text_content.strip():
        raise HTTPException(status_code=400, detail="No resume content provided")
    return process_resume_and_find_jobs(text_content, count=min(count, 100))


@app.post("/api/jobs/excel")
async def api_jobs_excel(
    request: Request,
    count: int = Form(30),
    resume: UploadFile = File(None),
    resume_text: str = Form(None),
):
    get_token(request)
    text_content = resume_text or ""
    if resume:
        content = await resume.read()
        try: text_content = content.decode('utf-8')
        except UnicodeDecodeError: text_content = content.decode('utf-8', errors='ignore')
    if not text_content.strip():
        raise HTTPException(status_code=400, detail="No resume content provided")
    result = process_resume_and_find_jobs(text_content, count=min(count, 100))
    excel_bytes = generate_jobs_excel(result["jobs"], result["parsed_resume"])
    filename = f"InfraBuild_Jobs_{datetime.now().strftime('%Y%m%d')}.xlsx"
    return StreamingResponse(
        excel_bytes,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={"Content-Disposition": f'attachment; filename="{filename}"'}
    )


# ─── Content Creator ──────────────────────────────────

@app.post("/api/content/generate")
async def api_generate_post(request: Request, payload: ContentRequest = None):
    get_token(request)
    if payload and payload.custom_topic:
        post = generate_post(custom_topic=payload.custom_topic)
    else:
        index = payload.service_index if payload else None
        post = generate_post(service_index=index)
    return post


@app.get("/api/content/weekly")
async def api_weekly_calendar(request: Request):
    get_token(request)
    posts = generate_weekly_calendar()
    return {"posts": posts, "timestamp": datetime.now().isoformat()}


# ─── Health ───────────────────────────────────────────

@app.get("/api/health")
async def health():
    return {"status": "ok", "timestamp": datetime.now().isoformat()}


# ─── Console Static ───────────────────────────────────

CONSOLE_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

@app.get("/console")
@app.get("/console/")
async def serve_console():
    console_html = os.path.join(CONSOLE_DIR, "index.html")
    if os.path.exists(console_html):
        return FileResponse(console_html)
    raise HTTPException(status_code=404, detail="Console not found")


# ─── Startup ──────────────────────────────────────────

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("CONSOLE_PORT", "8000"))
    uvicorn.run(app, host="0.0.0.0", port=port)
