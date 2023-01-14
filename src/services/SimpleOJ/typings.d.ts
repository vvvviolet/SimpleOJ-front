declare namespace API {
  // 前端发送
  type LoginParams = {
    id: string;
    password: string;
    autoLogin: boolean;
    type?: string;
  };
  // 后端返回
  type LoginResult = {
    success: boolean;
    data: {
      currentAuthority: string;
      token: string;
    };
    errorMessage: string;
  };
  // Model定义
  type UserItem = {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: number;
    status: number;
    password: string;
    create_time: string;
    update_time?: string;
    last_login_time?: string;
    access: string;
    ip: string;
  };
  // 后端返回
  type CurrentUser = {
    success: boolean;
    errorMessage: string;
    data: UserItem;
  };

  type UserList = {
    data: {
      list: UserItem[];
      current?: number;
      pageSize?: number;
      total?: number;
    };
    errorCode: string;
    errorMessage: string;
    showType: number;
    traceId: string;
    host: string;
    success: boolean;
  };
  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type getFakeCaptchaParams = {
    /** 手机号 */
    phone?: string;
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
    current: number;
    pageSize: number;
  };

  type PostResult = {
    success: boolean;
    errorMessage: string;
  };
  // 实验
  type ExperimentItem = {
    id: string;
    title: string;
    description?: string;
    publishTime: number;
    //开始时间
    startTime: number;
    status: number;
    //截止时间
    endTime: number;
  };
  // 实验列表
  type ExperimentList = {
    data: {
      list: ExperimentItem[];
      current?: number;
      pageSize?: number;
      total?: number;
    };
    errorCode: string;
    errorMessage: string;
    showType: number;
    traceId: string;
    host: string;
    success: boolean;
  };
  //题目
  type ProblemItem = {
    id?: number;
    name?: boolean;
    description?: string;
    filePath?: string;
    status?: string;
    createTime?: string;
    updateTime?: string;
    distributeTime?: number;
    endTime?: number;
    uploadTimesLimit?: string;
  };

  type ProblemList = {
    data: {
      list: ProblemItem[];
      current?: number;
      pageSize?: number;
      total?: number;
    };
    errorCode: string;
    errorMessage: string;
    showType: number;
    traceId: string;
    host: string;
    success: boolean;
  };

  type ExperimentSubmitList = {
    data: { list: ExperimentSubmit[]; total: number; current: number; pageSize: number };
    errorCode: string;
    errorMessage: string;
    showType: number;
    traceId: string;
    host: string;
    success: boolean;
  };
  type ExperimentSubmit = {
    studentId: string;
    studentName: string;
    deadline: string;
    firstSubmitTime: string;
    lastSubmitTime: string;
  };

  type Notice = {
    success: boolean;
    errorMessage: string;
    data: {
      id: number;
      title: string;
      content: string;
      publishDate: Date;
      publisher: string;
    };
  };
  type NoticeList = {
    data: {
      list: NoticeItem[];
      total: number;
    };
    total: number;
    success: boolean;
  };
  type NoticeItem = {
    id: number;
    title: string;
    content: string;
    publishDate: Date;
    publisher: string;
  };
}
