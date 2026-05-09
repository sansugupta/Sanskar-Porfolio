"""
Content Creator Agent — Generates Instagram posts with captions, images, and hashtags.
Supports scheduling, service rotation, and approval workflow.
"""
from datetime import datetime
from typing import Optional

SERVICES = [
    {
        "name": "DevOps Support",
        "emoji": "🔄",
        "hook": "Deployments breaking at 2 AM? We fix that.",
        "body": "Our DevOps team builds bulletproof CI/CD pipelines, container orchestration, and infrastructure as code. Zero drama deployments.\n\n✅ GitHub Actions / GitLab CI\n✅ Docker & Kubernetes\n✅ Terraform IaC\n✅ 24/7 monitoring\n\nStarting at $499/month.",
        "hashtags": "#DevOps #CICD #Kubernetes #Docker #CloudEngineering #Infrastructure",
    },
    {
        "name": "SRE Support",
        "emoji": "🛡️",
        "hook": "99.99% uptime isn't luck. It's engineering.",
        "body": "Our SRE team handles monitoring, incident response, and reliability engineering so your systems stay up while you sleep.\n\n📊 Prometheus + Grafana\n🚨 Alert tuning & incident workflows\n🔧 SLA-backed reliability\n\n$549/month — peace of mind included.",
        "hashtags": "#SRE #SiteReliability #Monitoring #Grafana #Prometheus #Uptime",
    },
    {
        "name": "Development Support",
        "emoji": "💻",
        "hook": "Your backlog called. It wants production code, not promises.",
        "body": "Senior engineers plugging directly into your stack. Java, Python, Node.js, React — we ship features that actually work.\n\n⚡ Production-grade code\n📋 PR support & code review\n🏗️ Architecture guidance\n\n$599/month of shipping power.",
        "hashtags": "#SoftwareDevelopment #FullStack #React #Python #NodeJS #Engineering",
    },
    {
        "name": "Bootcamp Service",
        "emoji": "🎓",
        "hook": "Theory won't get you hired. Practical skills will.",
        "body": "Our monthly bootcamp is hands-on, project-driven, and job-focused. Choose your track: DevOps, AWS Cloud, or Full-Stack.\n\n🛠️ Real-world implementation\n📝 Guided assignments\n🎯 Job application support\n\n$499/month — build your career.",
        "hashtags": "#Bootcamp #LearnDevOps #CloudComputing #TechCareers #CodingBootcamp",
    },
    {
        "name": "Data Engineering",
        "emoji": "📊",
        "hook": "Raw data is noise. We turn it into decisions.",
        "body": "ETL pipelines, data warehousing, Spark, Airflow, dbt — we build data infrastructure that actually delivers insights.\n\n🔗 Clean pipelines\n🏗️ Cloud-native architectures\n📈 Business-ready analytics\n\n$399/month.",
        "hashtags": "#DataEngineering #ETL #ApacheSpark #Airflow #Analytics #BigData",
    },
    {
        "name": "Career Support",
        "emoji": "🚀",
        "hook": "Your dream role is out there. We'll help you land it.",
        "body": "From resume optimization to interview prep to full placement support — our career services actually get results.\n\n📄 ATS-optimized resumes\n🎤 Mock interviews\n💼 Job search management\n\nStarting at $149/month.",
        "hashtags": "#CareerGrowth #JobSearch #InterviewPrep #ResumeTips #TechJobs",
    },
    {
        "name": "InfraBuild",
        "emoji": "⚡",
        "hook": "Building the foundation for your growth.",
        "body": "InfraBuild Partners delivers elite engineering, career support, and training solutions. Remote-first, global delivery, deadline-guaranteed.\n\n🏗️ DevOps & SRE\n💻 Development & Data\n🎓 Bootcamp & Career\n\nVisit infrabuildpartners.com",
        "hashtags": "#InfraBuild #Engineering #DevOps #CareerGrowth #TechServices",
    },
]


def generate_post(service_index: int = None, custom_topic: str = None) -> dict:
    """Generate an Instagram post for a specific service or custom topic."""

    if custom_topic:
        post = {
            "name": "Custom",
            "emoji": "✨",
            "hook": custom_topic[:80],
            "body": custom_topic,
            "hashtags": "#InfraBuild #Engineering #Tech",
        }
    else:
        if service_index is None:
            # Rotate based on day of year
            service_index = datetime.now().timetuple().tm_yday % len(SERVICES)
        post = SERVICES[service_index % len(SERVICES)]

    caption = f"""{post['emoji']} {post['hook']}

{post['body']}

---
🔗 infrabuildpartners.com
📧 sanskargupta966@gmail.com

{post['hashtags']}"""

    return {
        "service": post["name"],
        "caption": caption,
        "hook": post["hook"],
        "hashtags": post["hashtags"],
        "timestamp": datetime.now().isoformat(),
        "image_prompt": f"Professional dark-themed graphic for {post['name']} — InfraBuild Partners, modern tech aesthetic, dark background with cyan accents, minimal design",
    }


def generate_weekly_calendar() -> list:
    """Generate a week of posts, one per service."""
    posts = []
    for i in range(7):
        post = generate_post(service_index=i)
        post["day"] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"][i]
        posts.append(post)
    return posts
