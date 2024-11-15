import { Bell, Search, UserPlus, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function SubscriptionStatus() {
  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight">
            Subscription Status
          </h1>
          <Badge
            variant="secondary"
            className="bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700"
          >
            <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-green-600 inline-block" />
            Active
          </Badge>
        </div>
        <Button size="lg">Confirm Activity</Button>
      </div>

      <div className="grid grid-cols-2 gap-12">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Last ping date</p>
          <p className="text-xl font-semibold">November 14, 2024</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Next ping date</p>
          <p className="text-xl font-semibold">January 14, 2025</p>
        </div>
      </div>

      <Tabs defaultValue="beneficiaries" className="w-full">
        <TabsList className="w-full max-w-[400px] bg-muted/50">
          <TabsTrigger value="beneficiaries" className="flex-1">
            <Users className="h-4 w-4 mr-2" />
            Beneficiaries
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex-1">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Beneficiaries</h2>
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Filter by address or ENS" className="pl-8" />
          </div>
          <Link href="/add-beneficiary">
            <Button className="gap-2">
              <UserPlus className="h-4 w-4" />
              Add Beneficiary
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
