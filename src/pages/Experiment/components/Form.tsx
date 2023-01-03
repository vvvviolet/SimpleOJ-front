import {
  ProFormDateTimePicker,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
} from '@ant-design/pro-components';
import { Modal } from 'antd';
import React from 'react';
import { FormattedMessage, useIntl } from 'umi';

export type FormValueType = {
  name?: string;
  startTime?: string;
  endTime?: string;
  status?: string;
  frequency?: string;
} & Partial<API.ExperimentItem>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<API.ExperimentItem>;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  return <></>;
};

export default UpdateForm;
