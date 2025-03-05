"use client"

import type { ReactNode } from "react"
import { ThemeProvider } from "./providers/theme-provider"

interface ProvidersProps {
  children: ReactNode
}

export default function Providers({ children }: ProvidersProps) {
  return <ThemeProvider defaultTheme="light">{children}</ThemeProvider>
}

