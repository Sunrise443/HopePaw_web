from datetime import datetime

from fastapi import APIRouter, Response
from fastapi.responses import PlainTextResponse


router = APIRouter()

BASE_URL = "http://localhost:8000/"


@router.get("/sitemap.xml", response_class=Response)
def sitemap():
    now = datetime.utcnow().date().isoformat()

    urls = [
        {
            "loc": f"{BASE_URL}/",
            "priority": "1.0",
            "changefreq": "daily",
        },
        {
            "loc": f"{BASE_URL}/catalog",
            "priority": "0.9",
            "changefreq": "daily",
        },
        {
            "loc": f"{BASE_URL}/about",
            "priority": "0.7",
            "changefreq": "monthly",
        },
    ]

    urls_xml = "".join(
        [
            f"""
        <url>
            <loc>{url["loc"]}</loc>
            <lastmod>{now}</lastmod>
            <changefreq>{url["changefreq"]}</changefreq>
            <priority>{url["priority"]}</priority>
        </url>
        """
            for url in urls
        ]
    )

    xml = f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
{urls_xml}
</urlset>
"""

    return Response(content=xml.strip(), media_type="application/xml")


@router.get("/robots.txt", response_class=PlainTextResponse)
def robots():
    return """
User-agent: *
Disallow: /products-admin
Disallow: /partners-admin
Disallow: /users-admin
Disallow: /profile
Disallow: /cart
Disallow: /login
Disallow: /register

Allow: /
Allow: /catalog
Allow: /about

Sitemap: {BASE_URL}/sitemap.xml
"""
