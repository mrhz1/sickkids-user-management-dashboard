import React from 'react';
import { StatsCard } from '../../components/organisms/StatsCard';
import { Text } from '../../components/atoms/Text';

export const DashboardPage: React.FC = () => {
  return (
    <div>
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <Text as="h2" variant="body1" className="text-2xl font-bold mb-2">
          Welcome back, Dr. Sarah Wilson! 👋
        </Text>
        <Text variant="body2">Here's what's happening with your dashboard today.</Text>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatsCard
          title="Total Users"
          value="2,543"
          change="+12% from last month"
          changeType="positive"
        />
        <StatsCard
          title="Active Sessions"
          value="412"
          change="+5% from last week"
          changeType="positive"
        />
        <StatsCard title="Alerts" value="24" change="+3 new alerts" changeType="negative" />
        <StatsCard title="Growth Rate" value="23%" change="2% increase" changeType="positive" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <p className="text-gray-600">Activity chart would go here...</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <p className="text-gray-600">Quick action buttons would go here...</p>
        </div>
      </div>
    </div>
  );
};
