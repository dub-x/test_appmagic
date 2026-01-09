import React, { useMemo } from "react";
import { Line } from "@ant-design/plots";
import { Col, Row, Form, Select } from "antd";

import { getData, filterData } from "./utils";
import type { DateFormat, RangeFilterType } from "./utils";
import { createChartConfig, discretenessOptions, rangeOptions } from "./helpers/chartOptions";
import mocs from "./data/mocs.json";

const { Option } = Select;

type FormType = {
  range: RangeFilterType;
  discreteness: DateFormat;
}[];

const initialValues = {
  range: rangeOptions[0].value,
  discreteness: discretenessOptions[0].value,
};

function App() {
  const [form] = Form.useForm<FormType>();
  const discreteness = Form.useWatch("discreteness", form);
  const range = Form.useWatch("range", form);

  const modData = useMemo(() => getData(mocs.ethereum.transactions, discreteness), [discreteness]);
  const filteredData = useMemo(() => filterData(modData, range), [modData, range]);
  const config = createChartConfig(filteredData);

  return (
    <div className="App">
      <Row justify="center" style={{ paddingTop: "5vh" }}>
        <Col xs={18} style={{ marginBottom: "50px" }}>
          <Form
            form={form}
            name="basic"
            layout="inline"
            autoComplete="off"
            initialValues={initialValues}
          >
            <Form.Item name="range" label="Range">
              <Select style={{ minWidth: "130px" }}>
                {rangeOptions.map((o) => (
                  <Option value={o.value} key={o.value}>
                    {o.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="discreteness" label="Discreteness">
              <Select style={{ minWidth: "90px" }}>
                {discretenessOptions.map((o) => (
                  <Option value={o.value} key={o.value}>
                    {o.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </Col>

        <Col xs={18}>
          <Line {...config} />
        </Col>
      </Row>
    </div>
  );
}

export default App;
