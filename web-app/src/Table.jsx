import { useEffect, useState } from "react";
import {
  FilterMatchMode,
  FilterOperator,
  PrimeReactProvider,
} from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Calendar } from "primereact/calendar";

function Table() {
  const [data, setData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [lazyState, setLazyState] = useState({
    first: 0,
    rows: 30,
    page: 1,
    sortField: null,
    sortOrder: null,
    filters: {
      date_time: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
      },
      credit: {
        value: null,
        matchMode: FilterMatchMode.EQUALS,
      },
      detail: { value: "", matchMode: FilterMatchMode.CONTAINS },
    },
  });

  const fetchData = async (event = lazyState) => {
    const files = [
      "./data_part_1.json",
      "./data_part_2.json",
      "./data_part_3.json",
      "./data_part_4.json",
      "./data_part_5.json",
      "./data_part_6.json",
      "./data_part_7.json",
      "./data_part_8.json",
      "./data_part_9.json",
      "./data_part_10.json",
      "./data_part_11.json",
      "./data_part_12.json",
      "./data_part_13.json",
      "./data_part_14.json",
      "./data_part_15.json",
      "./data_part_16.json",
      "./data_part_17.json",
      "./data_part_18.json",
      "./data_part_19.json",
      "./data_part_20.json",
      "./data_part_21.json",
    ];
    setLoading(true);
    const responses = await Promise.all(files.map((file) => fetch(file)));
    const allData = await Promise.all(responses.map((res) => res.json()));

    let filteredData = allData.flatMap((data) => data);

    if (event.filters) {
      if (event.filters.date_time?.constraints[0].value) {
        const constraints = event.filters.date_time.constraints;
        const operator = event.filters.date_time.operator;

        filteredData = filteredData.filter((item) => {
          const itemDate = parseDate(item.date_time);

          if (!constraints || constraints.length === 0) {
            return true;
          }

          return operator === FilterOperator.AND
            ? constraints.every((constraint) => {
                const filterDate = new Date(constraint.value);
                switch (constraint.matchMode) {
                  case "dateIs":
                    return itemDate.getTime() === filterDate.getTime();
                  case "dateIsNot":
                    return itemDate.getTime() !== filterDate.getTime();
                  case "dateBefore":
                    return itemDate.getTime() < filterDate.getTime();
                  case "dateAfter":
                    return itemDate.getTime() > filterDate.getTime();
                  default:
                    return true;
                }
              })
            : constraints.some((constraint) => {
                const filterDate = new Date(constraint.value);
                switch (constraint.matchMode) {
                  case "dateIs":
                    return itemDate.getTime() === filterDate.getTime();
                  case "dateIsNot":
                    return itemDate.getTime() !== filterDate.getTime();
                  case "dateBefore":
                    return itemDate.getTime() < filterDate.getTime();
                  case "dateAfter":
                    return itemDate.getTime() > filterDate.getTime();
                  default:
                    return true;
                }
              });
        });
      }

      if (event.filters.credit?.value) {
        const creditFilterValue = +event.filters.credit.value;
        const matchMode = event.filters.credit.matchMode;

        filteredData = filteredData.filter((item) => {
          const creditValue = +item.credit;

          switch (matchMode) {
            case "lt":
              return creditValue < creditFilterValue;
            case "lte":
              return creditValue <= creditFilterValue;
            case "gt":
              return creditValue > creditFilterValue;
            case "gte":
              return creditValue >= creditFilterValue;
            case "equals":
              return creditValue === creditFilterValue;
            case "notEquals":
              return creditValue !== creditFilterValue;
            case "contains":
              return creditValue
                .toString()
                .includes(event.filters.credit.value);
            default:
              return true;
          }
        });
      }
      if (event.filters.detail?.value) {
        const detailFilterValue = event.filters.detail.value.toLowerCase();
        const matchMode = event.filters.detail.matchMode;

        filteredData = filteredData.filter((item) => {
          const detailValue = item.detail.toLowerCase();

          switch (matchMode) {
            case "equals":
              return detailValue === detailFilterValue;
            case "notEquals":
              return detailValue !== detailFilterValue;
            case "contains":
              return detailValue.includes(detailFilterValue);
            case "startsWith":
              return detailValue.startsWith(detailFilterValue);
            case "endsWith":
              return detailValue.endsWith(detailFilterValue);
            default:
              return true;
          }
        });
      }
    }

    if (event.sortField && event.sortOrder) {
      filteredData.sort((a, b) => {
        const value1 =
          event.sortField === "credit"
            ? parseFloat(a[event.sortField])
            : a[event.sortField];
        const value2 =
          event.sortField === "credit"
            ? parseFloat(b[event.sortField])
            : b[event.sortField];

        let result = null;
        if (typeof value1 === "string") {
          result = value1.localeCompare(value2);
        } else {
          result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
        }
        return event.sortOrder * result;
      });
    }

    const pageData = filteredData.slice(event.first, event.first + event.rows);
    setLoading(false);
    setData(pageData);
    setTotalRecords(filteredData.length);
  };

  useEffect(() => {
    fetchData();
  }, []);

  function parseDate(dateString) {
    const [day, month, year] = dateString.split("/").map(Number);

    return new Date(year, month - 1, day);
  }

  const onPage = (event) => {
    if (!event) return;
    setLazyState(event);
    fetchData(event);
  };

  const onSort = (event) => {
    setLazyState((prev) => ({
      ...prev,
      sortField: event.sortField,
      sortOrder: event.sortOrder,
    }));
    fetchData({
      ...lazyState,
      sortField: event.sortField,
      sortOrder: event.sortOrder,
    });
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat("vi-VN").format(value);
  };

  const dateFilterTemplate = (options) => {
    return (
      <Calendar
        value={options.value}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        dateFormat="dd/mm/yy"
        placeholder="dd/mm/yyyy"
        mask="99/99/9999"
      />
    );
  };

  return (
    <div style={{ fontFamily: "Inter, sans-serif" }}>
      <h1>Sao Kê VAR 🕵️‍♂️</h1>
      <p>
        Dữ liệu cung cấp bởi{" "}
        <a
          href="https://www.facebook.com/thongtinchinhphu/posts/pfbid03YkRTKZ5WjeHwBavPQbP7EShonj9tTExgY26gNhvQdiEsbjdsLWnzWEoQE1bU9SBl"
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          MTTQ
        </a>
      </p>
      <p>Dữ liệu bao gồm</p>
      <ul>
        <li>
          <a
            href="https://www.facebook.com/mttqvietnam/posts/pfbid0YSaZTjEw2GBMnT5bNBi49djNxnxi326VjKodHzdxvhpkW3rwTs8u5dCeVGvQmU18l"
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            Số tiền ủng hộ qua số tài khoản Vietcombank 0011001932418 từ ngày
            1/9/2024 đến ngày 10/9/2024
          </a>
        </li>
      </ul>
      {totalRecords > 0 && (
        <p style={{ textAlign: "right" }}>Tổng số giao dịch: {totalRecords}</p>
      )}
      <DataTable
        value={data}
        lazy
        paginator
        rows={lazyState.rows}
        totalRecords={totalRecords}
        loading={loading}
        first={lazyState.first}
        onPage={onPage}
        tableStyle={{ minWidth: "60rem" }}
        stripedRows
        scrollable
        selectionMode="single"
        selection={selectedProduct}
        onSelectionChange={(e) => setSelectedProduct(e.value)}
        dataKey="code"
        filters={lazyState.filters}
        onFilter={(e) => {
          setLazyState((prev) => ({ ...prev, filters: e.filters }));
          fetchData({ ...lazyState, filters: e.filters });
        }}
        onSort={onSort}
        sortField={lazyState.sortField}
        sortOrder={lazyState.sortOrder}
      >
        <Column
          field="date_time"
          header="Ngày"
          style={{ width: "5%" }}
          sortable
          filter
          filterField="date_time"
          dataType="date"
          filterElement={dateFilterTemplate}
        ></Column>
        <Column
          field="credit"
          header="Số tiền"
          style={{ width: "5%" }}
          sortable
          body={(rowData) => `${formatNumber(rowData.credit)}₫`}
          filter
          dataType="numeric"
        ></Column>
        <Column
          field="detail"
          header="Chi tiết giao dịch"
          style={{ width: "60%" }}
          filter
          filterPlaceholder="Lọc theo chi tiết giao dịch"
        ></Column>

        <Column
          field="code"
          header="Mã giao dịch"
          style={{ width: "5%" }}
        ></Column>
      </DataTable>
    </div>
  );
}

export default Table;
