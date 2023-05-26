import React, { useState } from 'react';
import VirtualTable, { Column } from './component/VirtualTable';

interface DataItem {
  id: number;
  name: string;
  age: string;
}

const rows: DataItem[] = [
  { id: 1, name: 'John Doe1', age: '25' },
  { id: 2, name: 'Jane Smith2', age: '30' },
  { id: 3, name: 'Jane Smith3', age: '31' },
  { id: 4, name: 'Jane Smith4', age: '32' },
  { id: 5, name: 'Jane Smith5', age: '33' },
  { id: 6, name: 'Jane Smith6', age: '34' },
  { id: 7, name: 'Jane Smith7', age: '35' },
  { id: 8, name: 'Jane Smith8', age: '36' },
  { id: 9, name: 'Jane Smith9', age: '37' },
  { id: 10, name: 'Jane Smith10', age: '38' },
  { id: 11, name: 'Jane Smith11', age: '39' },
  { id: 12, name: 'Jane Smith12', age: '39' },
  { id: 13, name: 'Jane Smith13', age: '39' },
  { id: 14, name: 'Jane Smith14', age: '39' },
  { id: 15, name: 'Jane Smith15', age: '39' },
  { id: 16, name: 'Jane Smith16', age: '39' },
  { id: 17, name: 'Jane Smith17', age: '39' },
  { id: 18, name: 'Jane Smith18', age: '39' },
  { id: 19, name: 'Jane Smith19', age: '39' },
  { id: 20, name: 'Jane Smith20', age: '39' }
  // 更多数据...
];

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
  const [data, setData] = useState<any[]>(rows)

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
      <h1 style={{color: '#fff'}}>Virtual Scrollable Table</h1>
      <VirtualTable rows={data} rowHeight={30} visibleRows={10} columns={columns} />
    </div>
  );
};

export default App;