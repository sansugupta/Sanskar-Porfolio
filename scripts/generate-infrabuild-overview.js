const fs = require("fs")
const path = require("path")
const puppeteer = require("puppeteer")

const servicesPath = path.join(__dirname, "../InfraBuild-Partners/data/services.json")
const outputDir = path.join(__dirname, "../public/downloads")
const outputPath = path.join(outputDir, "infrabuild-partners-overview.pdf")

const servicesData = JSON.parse(fs.readFileSync(servicesPath, "utf8"))

const engineeringServices = servicesData.engineering.map((service) => ({
  title: service.title,
  description: service.description,
  price: `${service.currency}${service.price}${service.period}`,
}))

const serviceCards = engineeringServices
  .map(
    (service) => `
      <article class="service-card">
        <div class="service-top">
          <h3>${service.title}</h3>
          <span class="price">${service.price}</span>
        </div>
        <p>${service.description}</p>
      </article>
    `
  )
  .join("")

const htmlContent = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>InfraBuild Partners Service Overview</title>
    <style>
      @page {
        size: 1120px 1400px;
        margin: 0;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        font-family: Arial, sans-serif;
        background:
          radial-gradient(circle at top left, rgba(0, 212, 255, 0.18), transparent 32%),
          radial-gradient(circle at top right, rgba(124, 92, 255, 0.18), transparent 30%),
          linear-gradient(180deg, #090b13 0%, #10141f 100%);
        color: #f5f7fb;
      }

      .page {
        width: 1120px;
        height: 1400px;
        padding: 46px;
        position: relative;
        overflow: hidden;
      }

      .eyebrow {
        color: #53d3ff;
        font-size: 16px;
        letter-spacing: 0.28em;
        text-transform: uppercase;
        margin-bottom: 14px;
      }

      h1 {
        margin: 0;
        font-size: 54px;
        line-height: 1;
      }

      .subtitle {
        color: #c2cadc;
        font-size: 19px;
        line-height: 1.45;
        max-width: 900px;
        margin: 18px 0 0;
      }

      .highlight {
        color: #82e6ff;
        font-weight: 700;
      }

      .stats {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 16px;
        margin: 26px 0 20px;
      }

      .stat-card,
      .service-card,
      .footer-card {
        background: rgba(15, 20, 31, 0.86);
        border: 1px solid rgba(130, 230, 255, 0.16);
        border-radius: 24px;
        box-shadow: 0 18px 50px rgba(0, 0, 0, 0.2);
      }

      .stat-card {
        padding: 18px;
      }

      .stat-card strong {
        display: block;
        font-size: 30px;
        color: #53d3ff;
        margin-bottom: 6px;
      }

      .stat-card span {
        color: #cfd6e6;
        font-size: 16px;
        line-height: 1.4;
      }

      .section-title {
        display: flex;
        align-items: center;
        gap: 12px;
        margin: 6px 0 18px;
        color: #ffffff;
        font-size: 24px;
        font-weight: 700;
      }

      .section-title::before {
        content: "";
        width: 52px;
        height: 4px;
        border-radius: 999px;
        background: linear-gradient(90deg, #00d4ff 0%, #7c5cff 100%);
      }

      .services-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 14px;
      }

      .service-card {
        padding: 18px;
        min-height: 182px;
      }

      .service-top {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 16px;
        margin-bottom: 10px;
      }

      .service-card h3 {
        margin: 0;
        font-size: 22px;
        line-height: 1.15;
      }

      .price {
        flex-shrink: 0;
        background: rgba(83, 211, 255, 0.12);
        border: 1px solid rgba(83, 211, 255, 0.24);
        color: #82e6ff;
        border-radius: 999px;
        padding: 8px 12px;
        font-size: 16px;
        font-weight: 700;
      }

      .service-card p {
        margin: 0;
        color: #d2d8e6;
        font-size: 16px;
        line-height: 1.45;
      }

      .footer-grid {
        display: grid;
        grid-template-columns: 1.3fr 1fr;
        gap: 14px;
        margin-top: 18px;
      }

      .footer-card {
        padding: 18px;
      }

      .footer-card h4 {
        margin: 0 0 8px;
        font-size: 20px;
      }

      .footer-card p,
      .footer-card li {
        color: #d2d8e6;
        font-size: 15px;
        line-height: 1.45;
      }

      .footer-card ul {
        margin: 0;
        padding-left: 22px;
      }

      .contact-line {
        margin-top: 12px;
        color: #82e6ff;
        font-size: 16px;
        font-weight: 700;
      }
    </style>
  </head>
  <body>
    <main class="page">
      <div class="eyebrow">InfraBuild Partners</div>
      <h1>Engineering support that ships on time.</h1>
      <p class="subtitle">
        InfraBuild Partners helps teams launch, stabilize, and scale digital products with
        <span class="highlight">development, DevOps, SRE, and data delivery</span>.
        This one-page overview is designed for clients who want a quick view of what we do and how we price it.
      </p>

      <section class="stats">
        <div class="stat-card">
          <strong>6</strong>
          <span>core engineering service lines</span>
        </div>
        <div class="stat-card">
          <strong>24/7</strong>
          <span>support mindset for critical systems</span>
        </div>
        <div class="stat-card">
          <strong>99.99%</strong>
          <span>reliability-first delivery approach</span>
        </div>
        <div class="stat-card">
          <strong>Fast</strong>
          <span>clear monthly pricing for easier client decisions</span>
        </div>
      </section>

      <div class="section-title">Service Overview & Pricing</div>
      <section class="services-grid">
        ${serviceCards}
      </section>

      <section class="footer-grid">
        <div class="footer-card">
          <h4>What clients get</h4>
          <ul>
            <li>Hands-on engineering execution instead of generic consulting slides</li>
            <li>Clear scopes for delivery, modernization, automation, and reliability work</li>
            <li>Pricing that makes it easy to start with one service or scale into a larger engagement</li>
          </ul>
        </div>
        <div class="footer-card">
          <h4>Start the conversation</h4>
          <p>
            Use this brochure as a quick client-facing handout for conversations around infrastructure,
            observability, application delivery, and technical support retainers.
          </p>
          <div class="contact-line">infrabuildpartners.com</div>
          <div class="contact-line">sanskargupta966@gmail.com</div>
        </div>
      </section>
    </main>
  </body>
</html>
`

async function generatePdf() {
  fs.mkdirSync(outputDir, { recursive: true })

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  })

  try {
    const page = await browser.newPage()
    await page.setViewport({ width: 1120, height: 1400, deviceScaleFactor: 1 })
    await page.setContent(htmlContent, { waitUntil: "networkidle0" })
    await page.pdf({
      path: outputPath,
      width: "1120px",
      height: "1400px",
      printBackground: true,
      preferCSSPageSize: true,
      margin: {
        top: "0",
        right: "0",
        bottom: "0",
        left: "0",
      },
    })
  } finally {
    await browser.close()
  }

  console.log(`InfraBuild overview PDF generated at ${outputPath}`)
}

generatePdf().catch((error) => {
  console.error(error)
  process.exit(1)
})
