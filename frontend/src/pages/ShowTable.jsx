import {useState, useEffect, useRef} from "react";
import axios from "axios";
import $ from "jquery";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import DataTables from "datatables.net";

export default function ShowTable() {

  const [tableData, setTableData] = useState([{}]);
  const tableRef = useRef();

  useEffect(() => {
    fetchData();
  }, [])

  // const tableDataFormatted = [];

  const fetchData = async () => {
    const res = await axios.get("http://localhost:3000/users");
    setTableData(res.data.data);
  }

  let tableDataFormatted = [];
  tableData.map((x) => {
    tableDataFormatted.push([
      x.name,
      x.age,
      x.sex,
      x.mobile,
      x.address,
      x.govId,

    ]);
  })
  console.log(`table data formatted: ${tableDataFormatted}`)

  useEffect(() => {
    const table = $(tableRef.current).DataTable({
      data: tableDataFormatted,
      columns: [
        { title: "Name" },
        { title: "Age" },
        { title: "Sex" },
        { title: "Mobile" },
        { title: "Address" },
        { title: "Gov ID" },
      ],
      destroy: true
    })
    return function() {
      console.log("Table destroyed");
      table.destroy();
    }
  }, []);

  return <table ref={tableRef}></table>
}
