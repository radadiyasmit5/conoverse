// client/src/layout/SidebarLayout.tsx
import React from "react";

interface SidebarLayoutProps {
  children: React.ReactNode;
}

const SidebarLayout: React.FC<SidebarLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Example left sidebar */}
      <aside className="w-64 border-r border-gray-700">
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-xl font-bold">Converse</h1>
        </div>
        {/* Additional sidebar content, nav, etc. */}
        <nav className="p-4 space-y-2">
          {/* Could have navigation links or a "New Chat" button here */}
        </nav>
      </aside>

      {/* Main content area */}
      <main className="flex-1 bg-gradient-to-b from-gray-800 to-gray-900">
        {children}
      </main>
    </div>
  );
};

export default SidebarLayout;
