import { Loader2Icon } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatTimeString } from '@/lib/utils';

interface TrafficView {
  timestamp: string;
  count: number;
  uniques: number;
}

interface TrafficData {
  count: number;
  uniques: number;
  views: TrafficView[];
  collected_at: string;
}

interface ChartDataPoint {
  date: string;
  visits: number;
  unique: number;
}

interface ProcessedTrafficData {
  chartData: ChartDataPoint[];
  total: number;
  uniques: number;
  lastUpdate: string;
}

const TrafficChart: React.FC = () => {
  const [trafficData, setTrafficData] = useState<ProcessedTrafficData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrafficData = async () => {
      try {
        const response = await fetch(
          'https://raw.githubusercontent.com/ExpTechTW/trem-plugins/main/data/traffic.json',
        );
        const data = (await response.json()) as TrafficData;

        // Transform data for the chart
        const chartData = data.views.map((item: TrafficView) => ({
          date: new Date(item.timestamp).toLocaleDateString(),
          visits: item.count,
          unique: item.uniques,
        }));

        setTrafficData({
          chartData,
          total: data.count,
          uniques: data.uniques,
          lastUpdate: data.collected_at,
        });
      }
      catch (error) {
        console.error('Error fetching traffic data:', error);
        setError('無法載入流量數據');
      }
      finally {
        setIsLoading(false);
      }
    };

    void fetchTrafficData();
  }, []);

  if (isLoading) {
    return (
      <Card className="mb-8">
        <CardContent className="flex h-64 items-center justify-center">
          <div className="flex items-center gap-2">
            <Loader2Icon className="animate-spin" />
            <div>載入流量數據中...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="mb-8">
        <CardContent className="flex h-64 items-center justify-center">
          <div className="text-red-500">{error}</div>
        </CardContent>
      </Card>
    );
  }

  if (!trafficData) {
    return null;
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>網站流量統計</CardTitle>
          <div className="text-sm text-muted-foreground">
            更新於
            {' '}
            {formatTimeString(new Date(trafficData.lastUpdate).getTime())}
          </div>
        </div>
        <div className="flex gap-4 pt-2">
          <div className="text-sm">
            總訪問次數:
            {' '}
            <span className="font-bold">{trafficData.total}</span>
          </div>
          <div className="text-sm">
            不重複訪客:
            {' '}
            <span className="font-bold">{trafficData.uniques}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trafficData.chartData}>
              <XAxis
                dataKey="date"
                stroke="#888888"
                fontSize={12}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
              />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="visits"
                name="訪問次數"
                stroke="#2563eb"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="unique"
                name="不重複訪客"
                stroke="#16a34a"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrafficChart;
