import { Provider } from "@/components/ui/provider"
import StyledComponentsRegistry from '@/lib/registry'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning>
      <body>
        <StyledComponentsRegistry>
          <Provider>
            {children}
          </Provider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
