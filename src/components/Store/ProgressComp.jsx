import React, { useEffect, useState } from "react";
import { VictoryPie, VictoryAnimation, VictoryLabel } from "victory";

const ProgressComp = ({ info }) => {
  const [data, setData] = useState([
    { x: 1, y: info?.reminder },
    { x: 2, y: info?.per },
  ]);
  useEffect(() => {
    if (data?.per !== info?.per) {
      setData([
        { x: 1, y: info?.reminder },
        { x: 2, y: info?.per },
      ]);
    }
  }, [info]);
  return (
    <div className="flex items-end justify-center lg:justify-end">
      <svg viewBox="0 0 400 400" width="8em" height="8em">
        <VictoryPie
          standalone={false}
          animate={{ duration: 1000 }}
          width={400}
          height={400}
          data={data}
          innerRadius={120}
          cornerRadius={45}
          labels={() => null}
          style={{
            data: {
              fill: ({ datum }) => {
                const color = datum.y > 0 ? "#22C55E" : "#000";
                return datum.x === 1 || datum.x === 100 ? color : "#EBEEF2";
              },
            },
          }}
        />
        <VictoryAnimation duration={1000} data={data}>
          {() => {
            return (
              <VictoryLabel
                textAnchor="middle"
                verticalAnchor="middle"
                x={200}
                y={200}
                text={`${Math.round(info?.reminder)}%`}
                style={{ fontSize: 45 }}
              />
            );
          }}
        </VictoryAnimation>
      </svg>
    </div>
  );
};

export default ProgressComp;
