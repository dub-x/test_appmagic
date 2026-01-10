import { useMemo } from "react";
import { Line } from "@ant-design/charts";
import { Col, Row, Form, Select } from "antd";

import { getData, filterData } from "./utils";
import type { DateFormat, RangeFilterType } from "./utils";
import { RANGE_OPTIONS, DISCRETENESS_OPTIONS, CHART_CONFIG } from "./consts";

import mocs from "./data/mocs.json";

const { Option } = Select;

type FormType = {
  range: RangeFilterType;
  discreteness: DateFormat;
}[];

const initialValues = {
  range: RANGE_OPTIONS[0].value,
  discreteness: DISCRETENESS_OPTIONS[0].value,
};

function App() {
  const [form] = Form.useForm<FormType>();
  const range = Form.useWatch("range", form);
  const discreteness = Form.useWatch("discreteness", form);

  const modData = useMemo(() => getData(mocs.ethereum.transactions, discreteness), [discreteness]);
  const filteredData = useMemo(() => filterData(modData, range), [modData, range]);

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
                {RANGE_OPTIONS.map((o) => (
                  <Option value={o.value} key={o.value}>
                    {o.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="discreteness" label="Discreteness">
              <Select style={{ minWidth: "90px" }}>
                {DISCRETENESS_OPTIONS.map((o) => (
                  <Option value={o.value} key={o.value}>
                    {o.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </Col>

        <Col xs={18}>
          <Line data={filteredData} {...CHART_CONFIG} />
        </Col>
      </Row>
    </div>
  );
}

export default App;
