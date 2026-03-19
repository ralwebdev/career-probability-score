import { Radar, RadarChart as RechartsRadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";

type Props = {
  data: { subject: string; score: number; fullMark: number }[];
};

export function RadarChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <RechartsRadarChart data={data} cx="50%" cy="50%" outerRadius="75%">
        <PolarGrid stroke="hsl(222, 30%, 18%)" />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 12, fontFamily: "Space Grotesk" }}
        />
        <PolarRadiusAxis
          angle={30}
          domain={[0, "auto"]}
          tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 10 }}
        />
        <Radar
          name="Score"
          dataKey="score"
          stroke="hsl(186, 100%, 50%)"
          fill="hsl(186, 100%, 50%)"
          fillOpacity={0.2}
          strokeWidth={2}
        />
      </RechartsRadarChart>
    </ResponsiveContainer>
  );
}
