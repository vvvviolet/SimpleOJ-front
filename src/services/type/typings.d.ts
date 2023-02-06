declare namespace API {
  // 前端发送
  type LoginParams = {
    id: string;
    password: string;
    autoLogin: boolean;
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
  // 后端返回
  type CurrentUser = {
    success: boolean;
    errorMessage: string;
    data: {
      ip: string;
      last_login_time?: number;
      expToFinish: number;
      problemSubmitted: number;
      problemPassed: number;
    } & Entity.User;
  };

  type UserList = {
    data: {
      list: User[];
      current?: number;
      pageSize?: number;
      total?: number;
    };
    errorMessage: string;
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

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconList = {
    data?: Entity.NoticeIcon[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type PageParams = {
    id?: string;
    current: string;
    pageSize: string;
  };

  type PostResult = {
    success: boolean;
    errorMessage: string;
  };

  // 实验列表
  type ExperimentList = {
    data: {
      list: Entity.Experiment[];
      current?: number;
      pageSize?: number;
      total?: number;
    };
    errorMessage: string;
    success: boolean;
  };

  type ProblemList = {
    data: {
      list: Entity.Problem[];
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
      list: Entity.Notice[];
      total: number;
    };
    total: number;
    success: boolean;
  };
}
declare namespace Entity {
  type User = {
    id: string;
    name: string;
    role: number;
    status: number;
    create_time: string;
    update_time?: string;
    access: string;
  };

  // 实验
  type Experiment = {
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

  type Notice = {
    id: number;
    title: string;
    content: string;
    publishDate: Date;
    publisher: string;
  };
  type ExperimentSubmit = {
    id: number;
    studentId: string;
    studentName: string;
    deadline: string;
    score?: number;
    status: number;
    firstSubmitTime: string;
    lastSubmitTime: string;
  };
  //题目
  type Problem = {
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

  type NoticeIcon = {
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
}
