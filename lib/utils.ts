import { NextRequest, NextResponse } from 'next/server'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Active, DataRef, Over } from '@dnd-kit/core'
import { ColumnDragData } from '@/components/kanban/board-column'
import { TaskDragData } from '@/components/kanban/task-card'

type DraggableData = ColumnDragData | TaskDragData

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function hasDraggableData<T extends Active | Over>(
  entry: T | null | undefined
): entry is T & {
  data: DataRef<DraggableData>
} {
  if (!entry) {
    return false
  }

  const data = entry.data.current

  if (data?.type === 'Column' || data?.type === 'Task') {
    return true
  }

  return false
}

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Đã xảy ra lỗi không xác định'
}

export function getRequestInfo(req: NextRequest) {
  // Lấy user-agent từ headers
  const userAgent = req.headers.get('user-agent') || 'Unknown user-agent'

  // Lấy IP address từ x-forwarded-for hoặc remoteAddress
  const forwardedFor = req.headers.get('x-forwarded-for')
  const ipAddress = forwardedFor
    ? forwardedFor.split(',')[0]
    : req.ip || 'Unknown IP'

  return { userAgent, ipAddress }
}

export function createResponse(
  message: string,
  data: any = null,
  status: number = 200,
  headers: Record<string, string> = {} // Optional headers
) {
  const response = NextResponse.json({ message, data }, { status })
  Object.entries(headers).forEach(([key, value]) => {
    response.headers.set(key, value)
  })
  return response
}
