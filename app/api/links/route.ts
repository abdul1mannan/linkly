import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateCode, isReservedCode, isValidUrl } from '@/lib/utils';

interface CreateLinkBody {
  longUrl: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as CreateLinkBody;
    const { longUrl } = body;

    // Validate longUrl
    if (!longUrl || typeof longUrl !== 'string') {
      return NextResponse.json(
        { error: 'longUrl is required and must be a string' },
        { status: 400 }
      );
    }

    if (!isValidUrl(longUrl)) {
      return NextResponse.json(
        { error: 'Invalid URL format. Must start with http:// or https://' },
        { status: 400 }
      );
    }

    // Generate unique code
    let code: string;
    let attempts = 0;
    const MAX_ATTEMPTS = 10;

    do {
      code = generateCode();
      attempts++;

      // Check if code is reserved
      if (isReservedCode(code)) {
        continue;
      }

      // Check if code already exists
      const existingLink = await prisma.link.findUnique({
        where: { code },
      });

      if (!existingLink) {
        break;
      }

      if (attempts >= MAX_ATTEMPTS) {
        return NextResponse.json(
          { error: 'Failed to generate unique code. Please try again.' },
          { status: 500 }
        );
      }
    } while (true);

    // Create link
    const link = await prisma.link.create({
      data: {
        code,
        longUrl,
      },
    });

    // Construct short URL
    const host = request.headers.get('host') || 'localhost:3000';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const shortUrl = `${protocol}://${host}/${code}`;

    return NextResponse.json({
      code: link.code,
      shortUrl,
      longUrl: link.longUrl,
      clicks: link.clicks,
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating short link:', error instanceof Error ? error.message : String(error));
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
