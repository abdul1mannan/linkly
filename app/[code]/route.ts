import { NextRequest } from 'next/server';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';

interface PageProps {
  params: Promise<{
    code: string;
  }>;
}

export async function GET(
  request: NextRequest,
  { params }: PageProps
) {
  const { code } = await params;

  // Find the link by code
  const link = await prisma.link.findUnique({
    where: { code },
  });

  if (!link) {
    return new Response('Short link not found', { status: 404 });
  }

  // Increment click count (don't await to make redirect faster)
  prisma.link.update({
    where: { code },
    data: {
      clicks: { increment: 1 },
    },
  }).catch(err => console.error('Failed to update clicks:', err));

  // Perform 301 permanent redirect
  redirect(link.longUrl);
}
