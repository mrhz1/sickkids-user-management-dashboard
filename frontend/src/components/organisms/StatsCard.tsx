import React from 'react';
import { Text } from '../atoms/Text';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  changeType = 'neutral',
}) => {
  const changeColor = {
    positive: 'text-green-600',
    negative: 'text-red-600',
    neutral: 'text-gray-600',
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <Text variant="caption" className="text-gray-600 mb-1">
            {title}
          </Text>
          <Text as="div" variant="body1" className="text-3xl font-bold">
            {value}
          </Text>
        </div>
        <div className="w-10 h-10 bg-gray-200 rounded-lg" />
      </div>

      {change && (
        <Text variant="caption" className={changeColor[changeType]}>
          {change}
        </Text>
      )}
    </div>
  );
};
