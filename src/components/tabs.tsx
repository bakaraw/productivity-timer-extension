import React, { useState, ReactNode } from 'react';

type TabItem = {
  label: string;
  content: ReactNode;
};

interface TabsProps {
  tabs: TabItem[];
}

const Tabs = (params: TabsProps) => {

  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <div className="w-full h-full">
      {/* Tab header */}
      <div className="flex border-b border-gray-200 justify-end">
        {params.tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`py-2 px-4 text-sm font-medium transition-colors duration-300 ${activeTab === index
              ? 'border-b-2 border-blue-500 text-blue-500'
              : 'text-gray-500 hover:text-blue-500'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="p-4 h-full">
        {params.tabs[activeTab].content}
      </div>
    </div>
  );
};

export default Tabs;
