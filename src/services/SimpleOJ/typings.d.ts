declare namespace API {
  type CurrentUser = {
    data: {
      id: string;
      name: string;
      email: string;
      role: string;
      status: number;
      access: string;
      phone: string;
      ipv4: string;
      token: string;
    };
    success: boolean;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type getFakeCaptchaParams = {
    /** 手机号 */
    phone?: string;
  };

  type LoginParams = {
    username?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type LoginResult = {
    success: boolean;
    data: {
      currentAuthority: string;
      token: string;
    };
  };

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type ruleParams = {
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  };
  type postResult = {
    success: boolean;
  };
  // 实验
  type ExperimentItem = {
    // 主键
    title: string;
    description?: string;
    publishDate: number;
    //开始时间
    startTime: number;
    status: number;
    //截止时间
    endTime?: number;
  };
  // 实验列表
  type ExperimentList = {
    data?: ExperimentItem[];
    total?: number;
    success?: boolean;
  };
  //题目
  type Problem = {
    // 主键
    id?: number;
    name?: boolean;
    description?: string;
    filePath?: string;
    //状态 0 未发布 1 已发布 2 已结束
    status?: string;
    //创建时间
    createTime?: string;
    //更新时间
    updateTime?: string;
    //发布时间
    distributeTime?: number;
    //截止时间
    endTime?: number;
    //提交次数限制
    uploadTimesLimit?: string;
  };

  type ProblemList = {
    data?: ExperimentItem[];
    total?: number;
    success?: boolean;
  };

  // 用户
  type User = {
    name?: string;
    id: string;
    email?: string;
    phone?: string;
    role: int;
    status: int;
    access?: string;
  };
  type UserList = {
    data: User[];
    total?: number;
    success?: boolean;
  };
  type ExperimentSubmitList = {
    data: ExperimentSubmit[];
    total: number;
    success: boolean;
  };
  type ExperimentSubmit = {
    id: string;
    title: string;
    submitTime: string;
  };
}

type Notice = {
  title: string;
  content: string;
  publishDate: Date;
  publisher: string;
};
type NoticeList = {
  data?: Notice[];
  total?: number;
  success?: boolean;
};
