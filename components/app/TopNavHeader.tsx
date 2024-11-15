import React from "react";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, Clock } from "lucide-react";
import Link from "next/link";

const TopNavHeader = () => {
  return (
    <div className="w-full bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Brand */}
          <Link href="/">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-semibold">Willi</h1>
            </div>
          </Link>

          {/* Right side - Account & Actions */}
          <div className="flex items-center space-x-4">
            {/* Timer/Clock Icon */}
            <div className="hidden sm:flex items-center">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="ml-2 text-sm text-gray-500">0.00</span>
            </div>

            {/* Account Button */}
            <Button
              variant="outline"
              className="flex items-center space-x-2 border border-green-500 text-gray-700 hover:bg-green-50"
            >
              <div className="h-6 w-6 rounded-full bg-gray-200" />
              <span className="text-sm">willi.eth</span>
            </Button>

            {/* Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-500 hover:text-gray-700"
            >
              <EllipsisVertical className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavHeader;
