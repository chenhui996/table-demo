import React, { useState } from 'react';
import VirtualTable, { Column } from './component/VirtualTable';

interface DataItem {
  id: number;
  name: string;
  age: string;
}

const mockData: DataItem[] = Array.from({ length: 200 }).map((_, index) => ({
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
  age: `${index + 1}`
}));

const columns: Column[] = [
  { dataIndex: 'id', title: 'ID', width: 100, textAlign: 'left' },
  { dataIndex: 'name', title: 'Name', textAlign: 'left', width: 200 },
  { dataIndex: 'name1', title: 'Name', textAlign: 'left', width: 200 },
  { dataIndex: 'name2', title: 'Name', textAlign: 'left', width: 200 },
  { dataIndex: 'name3', title: 'Name', textAlign: 'left', width: 200 },
  { dataIndex: 'name4', title: 'Name', textAlign: 'left', width: 200 },
  { dataIndex: 'name5', title: 'Name', textAlign: 'left', width: 200 },
  { dataIndex: 'age', title: 'Age', textAlign: 'left', width: 200 },
  { dataIndex: 'name6', title: 'Name', textAlign: 'left', width: 200 },
  { dataIndex: 'name7', title: 'Name', textAlign: 'left', width: 200 },
  { dataIndex: 'name8', title: 'Name', textAlign: 'left', width: 200 },
  { dataIndex: 'name9', title: 'Name', textAlign: 'left', width: 200 },
  { dataIndex: 'name10', title: 'Name', textAlign: 'left', width: 200 },
  { dataIndex: 'name11', title: 'Name', textAlign: 'left', width: 200 },
  { dataIndex: 'name12', title: 'Name', textAlign: 'left', width: 200 },
  { dataIndex: 'name13', title: 'Name', textAlign: 'left', width: 200 },
  { dataIndex: 'name14', title: 'Name', textAlign: 'left', width: 200 },
  { dataIndex: 'age', title: 'Age2', textAlign: 'left', width: 200 },
  { dataIndex: 'name15', title: 'Name', textAlign: 'left', width: 200 },
  { dataIndex: 'name16', title: 'Name', textAlign: 'left', width: 200 },
  { dataIndex: 'name17', title: 'Name', textAlign: 'left', width: 200 },
  { dataIndex: 'name18', title: 'Name', textAlign: 'left', width: 200 },
  { dataIndex: 'name19', title: 'Name', textAlign: 'left', width: 200 },
  { dataIndex: 'name20', title: 'Name', textAlign: 'left' },
  { dataIndex: 'age', title: 'Age3', textAlign: 'left', width: 200 },
  // 其他列设置
];

const App: React.FC = () => {
  const [data, setData] = useState<DataItem[]>(mockData)

  // setTimeout(() => {
  //   const newData = [...data].concat([{
  //     id: data.length + 1,
  //     name: 'Jane Smith',
  //     age: '40'
  //   }]);

  //   console.log('newData', newData);

  //   setData(newData)
  // }, 20);

  return (
    <div>
      <h1 style={{ color: '#fff' }}>Virtual Scrollable Table</h1>
      <VirtualTable rows={data} height={240} rowHeight={24} visibleRows={10} columns={columns} />
    </div>
  );
};

export default App;