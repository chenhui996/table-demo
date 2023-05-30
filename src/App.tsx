import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import VirtualTable, { Column } from './component/VirtualTable';

interface DataItem {
  id: number;
  name: string;
  age: number;
}

const mockData: DataItem[] = Array.from({ length: 80000 }).map((_, index) => ({
  id: index + 1,
  name: `John Doe${index + 1}`,
  name1: `John Doe${index + 1}`,
  name2: `John Doe${index + 1}`,
  name3: `John Doe${index + 1}`,
  name4: `John Doe${index + 1}`,
  name5: `John Doe${index + 1}`,
  name6: `John Doe${index + 1}`,
  name7: `John Doe${index + 1}`,
  name8: `John Doe${index + 1}`,
  name9: `John Doe${index + 1}`,
  name10: `John Doe${index + 1}`,
  name11: `John Doe${index + 1}`,
  name12: `John Doe${index + 1}`,
  name13: `John Doe${index + 1}`,
  name14: `John Doe${index + 1}`,
  name15: `John Doe${index + 1}`,
  name16: `John Doe${index + 1}`,
  name17: `John Doe${index + 1}`,
  name18: `John Doe${index + 1}`,
  name19: `John Doe${index + 1}`,
  name20: `John Doe${index + 1}`,
  age: index + 1
}));

const columns: Column[] = [
  { dataIndex: 'id', title: 'ID', width: 100, textAlign: 'left' },
  { dataIndex: 'name', title: 'Name', textAlign: 'left', width: 200 },
  { dataIndex: 'name1', title: 'Name', textAlign: 'left', width: 200 },
  { dataIndex: 'name2', title: 'Name', textAlign: 'left', width: 200 },
  { dataIndex: 'name3', title: 'Name', textAlign: 'left', width: 200 },
  { dataIndex: 'name4', title: 'Name', textAlign: 'left', width: 200 },
  { dataIndex: 'name5', title: 'Name', textAlign: 'left', width: 200 },
  { dataIndex: 'age', title: 'Age', textAlign: 'left' },
  { dataIndex: 'name6', title: 'Name', textAlign: 'left', width: 200 },
  { dataIndex: 'name7', title: 'Name', textAlign: 'left', width: 200 },
  { dataIndex: 'name8', title: 'Name', textAlign: 'left', width: 200 },
  { dataIndex: 'name9', title: 'Name', textAlign: 'left', width: 200 },
  // { dataIndex: 'name10', title: 'Name', textAlign: 'left', width: 200 },
  // { dataIndex: 'name11', title: 'Name', textAlign: 'left', width: 200 },
  // { dataIndex: 'name12', title: 'Name', textAlign: 'left', width: 200 },
  // { dataIndex: 'name13', title: 'Name', textAlign: 'left', width: 200 },
  // { dataIndex: 'name14', title: 'Name', textAlign: 'left', width: 200 },
  // { dataIndex: 'age', title: 'Age2', textAlign: 'left', width: 200 },
  // { dataIndex: 'name15', title: 'Name', textAlign: 'left', width: 200 },
  // { dataIndex: 'name16', title: 'Name', textAlign: 'left', width: 200 },
  // { dataIndex: 'name17', title: 'Name', textAlign: 'left', width: 200 },
  // { dataIndex: 'name18', title: 'Name', textAlign: 'left', width: 200 },
  // { dataIndex: 'name19', title: 'Name', textAlign: 'left', width: 200 },
  // { dataIndex: 'name20', title: 'Name', textAlign: 'left' },
  // { dataIndex: 'age', title: 'Age3', textAlign: 'left', width: 200 },
  // 其他列设置
];

const App: React.FC = () => {
  const [data, setData] = useState<DataItem[]>(mockData);
  const [updateKey, setUpdateKey] = useState<number | undefined>(undefined);
  const [rowSize, setRowSize] = useState<number[]>([0, 0]);

  const fetchRowSize = (size: number[]) => {
    setRowSize(size);
  }

  useEffect(() => {
    const pushData = setInterval(() => {
      const radomIndex = Math.floor(Math.random() * (10 - 0 + 1) + 0);
      if (radomIndex >= rowSize[0] && radomIndex <= rowSize[1]) {
        const newData = [...data];
        newData[radomIndex].age = Math.floor(Math.random() * 100);

        setUpdateKey(radomIndex + 1);
        setData(newData);
      }
    }, 50);

    return () => {
      clearInterval(pushData);
    }
  }, [rowSize, data])

  return (
    <div>
      <h1>123</h1>
      <VirtualTable
        rowKey='id'
        data={data}
        columns={columns}
        height={300}
        updateKey={updateKey}
        animationOpen={true}
        rowSizeChange={fetchRowSize}
      />
    </div>
  );
};

export default App;