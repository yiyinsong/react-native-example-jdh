const BACKGROUNDCOLOR_GRAY = '#f5f5f5';
const BACKGROUNDCOLOR_WHITE = '#fff';

const COLOR_RED = '#f93b31';
const COLOR_BLUE = '#0386fc';
const COLOR_BLACK = '#000';
const COLOR_A = '#aaa';
const COLOR_D = '#ddd';
const COLOR_3 = '#333';
const COLOR_6 = '#666';
const COLOR_9 = '#999';
const COLOR_E = '#eee';

const FONT_8 = 8;
const FONT_10 = 10;
const FONT_12 = 12;
const FONT_14 = 14;
const FONT_16 = 16;
const FONT_18 = 18;

export default {
  //公用样式
  common: {
    init: {
      backgroundColor: BACKGROUNDCOLOR_GRAY
    },
    initWhite: {
      backgroundColor: BACKGROUNDCOLOR_WHITE,
    },
    flex: {
      flex: 1,
      flexDirection: 'row',
    },
    flexv: {
      flex: 1
    },
    flexDirectionRow: {
      flexDirection: 'row'
    },
    flexEndh: {
    	justifyContent: 'flex-end'
    },
    flexEndv: {
    	alignItems: 'flex-end'
    },
    flexCenterh: {
      justifyContent: 'center'
    },
    flexCenterv: {
    	alignItems: 'center'
    },
    flexSelfLeft: {
      alignSelf: 'flex-start'
    },
    flexSelfCenter: {
      alignSelf: 'center'
    },
    flexSelfRight: {
      alignSelf: 'flex-end'
    },
    iconBackArrow: {
      width: 18,
      height: 18,
      marginLeft: 10,
      resizeMode: 'contain'
    },
    headerBtnRight: {
      width: 18,
      height: 18,
      marginRight: 10
    },
    tabIcon: {
      width: 20,
      height: 20
    },
    headerLeftNone: {
      width: 20,
      height: 20
    },
    headerGray: {
      backgroundColor: BACKGROUNDCOLOR_GRAY,
      height: 65,
      elevation: 0,
      shadowOpacity: 0,
      borderBottomColor: COLOR_D,
      borderBottomWidth: 1,
      paddingTop: 20,
    },
    loadingTips: {
      color: COLOR_9,
      fontSize: FONT_12,
      paddingTop: 5,
      paddingBottom: 10,
      textAlign: 'center'
    },
  },
  modal: {
    container: {
      flex:1,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      justifyContent:'center',
      alignItems:'center'
    },
    container2: {
      position: 'absolute',
      zIndex: 2
    },
    confirm: {
      content: {
        backgroundColor: BACKGROUNDCOLOR_WHITE,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        borderRadius: 4
      },
      btn: {
        flexDirection: 'row'
      },
      text: {
        textAlign: 'center',
        fontSize: FONT_14,
        marginBottom: 20
      },
      confirm: {
        borderRadius: 2,
        backgroundColor: COLOR_RED,
        borderWidth: 1,
        borderColor: COLOR_RED,
        paddingTop: 6,
        paddingBottom: 6,
        flex: 1,
        marginRight: 8
      },
      confirmText: {
        color: BACKGROUNDCOLOR_WHITE,
        fontSize: FONT_12,
        textAlign: 'center'
      },
      cancel: {
        borderRadius: 2,
        backgroundColor: BACKGROUNDCOLOR_WHITE,
        borderWidth: 1,
        borderColor: COLOR_D,
        paddingTop: 6,
        paddingBottom: 6,
        textAlign: 'center',
        flex: 1,
        marginLeft: 8
      },
      cancelText: {
        color: COLOR_3,
        fontSize: FONT_12,
        textAlign: 'center'
      },
    },
    prompt: {
      content: {
        backgroundColor: BACKGROUNDCOLOR_WHITE,
        padding: 20,
        borderRadius: 4
      },
      container: {
        paddingTop: 10,
        paddingBottom: 10,
        position: 'relative'
      },
      error: {
        position: 'absolute',
        left: 0,
        right: 0,
        zIndex: 2,
        bottom: 45,
      },
      errorText: {
        color: BACKGROUNDCOLOR_WHITE,
        fontSize: FONT_10,
        textAlign: 'center',
        backgroundColor: COLOR_BLACK,
        borderRadius: 3,
        paddingTop: 3,
        paddingBottom: 3,
      },
      text: {
        fontSize: FONT_12,
        color: COLOR_3,
        textAlign: 'center'
      },
      input: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: COLOR_E,
        height: 30,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: FONT_12
      },
      triangle: {
        width: 0,
        height: 0,
        borderLeftWidth: 3,
        borderLeftColor: 'transparent',
        borderRightWidth: 3,
        borderRightColor: 'transparent',
        borderTopWidth: 5,
        borderTopColor: COLOR_BLACK,
        alignSelf: 'center'
      }
    },
    address: {
      content: {
        backgroundColor: BACKGROUNDCOLOR_WHITE
      },
      title: {
        padding: 10,
        position: 'relative'
      },
      titleText: {
        textAlign: 'center',
        fontSize: FONT_14,
        paddingLeft: 20,
        paddingRight: 20
      },
      closec: {
        position: 'absolute',
        top: 8,
        right: 5
      },
      close: {
        width: 24,
        height: 24
      },
      itemText: {
        fontSize: FONT_12,
        color: COLOR_6
      },
      itemImg: {
        width: 12,
        height: 12,
        marginLeft: 5,
        resizeMode: 'contain',
        marginTop: 2
      },
      item: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10
      },
      tab: {
        borderBottomWidth: 1,
        borderBottomColor: COLOR_E
      },
      tabItem: {
        fontSize: FONT_12,
        color: COLOR_6,
        paddingLeft: 10,

      },
      tabItemText: {
        fontSize: FONT_12,
        color: COLOR_6,
        paddingBottom: 5,
        borderBottomWidth: 2,
        borderBottomColor: BACKGROUNDCOLOR_WHITE
      },
      svc: {
        paddingTop: 5,
        paddingBottom: 5
      }
    }
  },
  loading: {
    spinner: {
      position: 'absolute',
    },
    content: {
      border: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      borderRadius: 4,
      padding: 4
    }
  },
  //买家买家入口
  entrance: {
    wrapper: {
      backgroundColor: BACKGROUNDCOLOR_WHITE
    },
    h1: {
      fontSize: FONT_18,
      textAlign: 'center',
      marginTop: 50,
      color: COLOR_3,
    },
    h5: {
      fontSize: FONT_12,
      textAlign: 'center',
      marginTop: 10,
      color: COLOR_9,
    },
    icon: {
      resizeMode: 'contain',
      alignSelf: 'center'
    },
    iconText: {
      color: COLOR_6,
      textAlign: 'center',
      marginTop: 5,
      fontSize: FONT_12
    },
    entr: {
      marginTop: 100,
    }
  },
  //卖家中心
  shome: {
    container: {
      flex: 1,
    },
    head: {
      position: 'relative',
      paddingTop: 20,
      backgroundColor: COLOR_BLUE,
    },
    headContent: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1,
    },
    userBlock: {
      flex: 1,
      padding: 10,
      flexDirection: 'row',
    },
    userBlockLeft: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center'
    },
    arrowRight: {
      width: 14,
      height: 14,
      resizeMode: 'contain'
    },
    userNavText: {
      color: BACKGROUNDCOLOR_WHITE,
      fontSize: FONT_12
    },
    userNavToMess: {
      width: 20,
      height: 20,
      position: 'relative'
    },
    userMessIcon: {
      width: 20,
      height: 20
    },
    badge: {
      width: 14,
      height: 14,
      borderRadius: 7,
      backgroundColor: BACKGROUNDCOLOR_WHITE,
      position: 'absolute',
      top: -4,
      right: -4
    },
    badgeText: {
      fontSize: FONT_8,
      textAlign: 'center',
      lineHeight: 13,
      color: COLOR_RED
    },
    userHeadIcon: {
      width: 65,
      height: 65,
      borderRadius: 4
    },
    userData: {
      paddingLeft: 10
    },
    userName: {
      fontSize: FONT_14,
      color: BACKGROUNDCOLOR_WHITE
    },
    idTab: {
      position: 'relative',
      marginTop: 8
    },
    idTabText: {
      position: 'absolute',
      zIndex: 2,
      textAlign: 'center',
      textAlignVertical: 'center',
      width: 81,
      height: 25,
      fontSize: FONT_12
    },
    idTabImg: {
      width: 81,
      height: 25
    },
    userShare: {
      width: 16,
      height: 16
    },
    userToOther: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    userQrcode: {
      width: 16,
      height: 16,
      marginLeft: 20
    },
    userInfo: {
      alignItems: 'flex-end'
    },
    dl: {
      backgroundColor: BACKGROUNDCOLOR_WHITE,
      marginBottom: 10
    },
    dt: {
      borderBottomWidth: 1,
      borderBottomColor: COLOR_E,
      padding: 10
    },
    dtlIcon: {
      width: 12,
      height: 12,
      marginRight: 5
    },
    dtName: {
      fontSize: FONT_12,
      color: COLOR_3
    },
    dtMore: {
      fontSize: FONT_12,
      color: COLOR_9,
      marginRight: 3
    },
    arrowRightBlack: {
      width: 5,
      height: 10
    },
    storeDataList: {
      paddingTop: 5,
      paddingBottom: 5,
      marginLeft: 5,
      marginRight: 5,
      borderBottomWidth: 1,
      borderBottomColor: COLOR_E
    },
    storeDataItem: {
      borderRightWidth: 1,
      borderRightColor: COLOR_E,
      flex: 1,
      marginTop: 10,
      marginBottom: 10,
      paddingTop: 5,
      paddingBottom: 5
    },
    storeDataIs: {
      fontSize: FONT_12,
      color: COLOR_3,
      fontWeight: '500',
      textAlign: 'center'
    },
    storeDataIe: {
      fontSize: FONT_10,
      color: COLOR_6,
      textAlign: 'center',
      marginTop: 5
    },
    borderNone: {
      borderRightWidth: 0,
      borderBottomWidth: 0
    },
    order: {
      flex: 1,
      alignItems: 'center',
      paddingTop: 25,
      paddingBottom: 25
    },
    orderContent: {

      alignItems: 'center'
    },
    orderIcon: {
      width: 20,
      height: 20
    },
    orderText: {
      fontSize: FONT_12,
      color: COLOR_3,
      marginTop: 5
    },
    orderBadge: {
      position: 'absolute',
      top: -5,
      right: 0,
      width: 14,
      height: 14,
      backgroundColor: COLOR_RED,
      borderRadius: 7,
    },
    orderBadgeText: {
      color: BACKGROUNDCOLOR_WHITE,
      fontSize: FONT_8,
      textAlign: 'center',
      width: 14,
      height: 14,
      lineHeight: 13
    },
    borderNone: {
      borderBottomWidth: 0
    }
  },
  //账户信息
  sinfo: {
    headerRight: {
      paddingRight: 13,
      paddingTop: 3
    },
    mess: {
      position: 'relative',
    },
    messBadge: {
      position: 'absolute',
      borderRadius: 6,
      width: 12,
      height: 12,
      backgroundColor: COLOR_RED,
      right: -3,
      top: -3,
      zIndex: 1
    },
    messBadgeText: {
      textAlign: 'center',
      color: BACKGROUNDCOLOR_WHITE,
      fontSize: FONT_8
    },
    messIcon: {
      width: 20,
      height: 20
    },
    storeInfoWrapper: {
      backgroundColor: BACKGROUNDCOLOR_WHITE,
      margin: 10,
      paddingLeft: 10,
      paddingRight: 10
    },
    storeInfoItemLeft: {
      textAlign: 'left',
      color: COLOR_3,
      fontSize: FONT_16
    },
    storeInfoItemRight: {
      textAlign: 'right',
      color: COLOR_9
    },
    storeInfoItem: {
      paddingTop: 15,
      paddingBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: COLOR_E
    },
    address: {
      backgroundColor: BACKGROUNDCOLOR_WHITE,
      marginTop: 10,
      marginBottom: 10,
      padding: 10
    },
    addrIcon: {
      width: 24,
      height: 24,
      marginRight: 5
    },
    addrTitle: {
      color: COLOR_3,
      fontSize: FONT_16
    },
    addrText: {
      color: COLOR_9
    },
    colorOrg: {
      color: COLOR_RED
    },
    addrArrow: {
      width: 7,
      height: 13,
      resizeMode: 'contain',
      marginLeft: 5
    },
    logoutBtn: {
      marginTop: 20,
      marginLeft: 50,
      marginRight: 50,
      borderWidth: 1,
      borderColor: COLOR_RED,
      backgroundColor: BACKGROUNDCOLOR_WHITE,
      paddingTop: 15,
      paddingBottom: 15,
      borderRadius: 4
    },
    logoutText: {
      textAlign: 'center',
      color: COLOR_RED
    }
  },
  //卖家地址管理
  saddr: {
    listDl: {
      backgroundColor: BACKGROUNDCOLOR_WHITE
    },
    listDt: {
      borderBottomWidth: 1,
      borderBottomColor: COLOR_E,
      padding: 10
    },
    listDtText: {
      fontSize: FONT_12,
      color: COLOR_9
    },
    listDtTextActive: {
      fontSize: FONT_12,
      color: COLOR_RED
    },
    listDd: {
      borderTopWidth: 10,
      borderTopColor: BACKGROUNDCOLOR_GRAY,
    },
    footer: {
      backgroundColor: BACKGROUNDCOLOR_GRAY,
      borderTopWidth: 1,
      borderTopColor: COLOR_E,
      padding: 10,
    },
    footerBtn: {
      backgroundColor: COLOR_BLUE,
      color: BACKGROUNDCOLOR_WHITE,
      fontSize: FONT_14,
      textAlign: 'center',
      paddingTop: 10,
      paddingBottom: 10,
      borderRadius: 4
    },
    item: {
      borderBottomWidth: 10,
      borderBottomColor: BACKGROUNDCOLOR_GRAY
    },
    itemTop: {
      borderTopWidth: 1,
      borderTopColor: COLOR_E,
      paddingLeft: 10,
      paddingTop: 10,
      paddingRight: 10,
      paddingBottom: 5
    },
    itemUser: {
      fontSize: FONT_14,
      color: COLOR_3
    },
    itemAddr: {
      fontSize: FONT_12,
      color: COLOR_9,
      paddingLeft: 10,
      paddingBottom: 10,
      paddingRight: 10
    },
    itemBottom: {
      borderTopWidth: 1,
      borderTopColor: COLOR_E,
      borderBottomWidth: 1,
      borderBottomColor: COLOR_E,
      padding: 10,
    },
    itemIcon: {
      width: 14,
      height: 14,
      marginRight: 5
    },
    itemBtn: {
      marginLeft: 20
    },
    itemBtnText: {
      fontSize: FONT_12,
      color: COLOR_9
    },
    add: {
      backgroundColor: BACKGROUNDCOLOR_WHITE
    },
    group: {
      borderBottomWidth: 1,
      borderBottomColor: COLOR_E,
      paddingLeft: 10,
      paddingRight: 10
    },
    addLabel: {
      fontSize: FONT_12,
      color: COLOR_9,
    },
    addAbsolute: {
      padding: 0,
      margin: 0,
      flex: 1,
      flexDirection: 'row',
      height: 40
    },
    addFooter: {
      borderTopWidth: 0,
      backgroundColor: BACKGROUNDCOLOR_WHITE
    },
    input: {
      fontSize: FONT_12,
      color: COLOR_3,
      margin: 0,
      padding: 0
    }
  },
  storeInfo: {
    block: {
      marginTop: 10
    },
    more: {
      marginLeft: 10,
      marginRight: 10,
      borderBottomWidth: 1,
      borderBottomColor: COLOR_E,
      paddingTop: 10,
      paddingBottom: 10
    },
    moreName: {
      color: COLOR_9,
      fontSize: FONT_12
    },
    moreNum: {
      fontSize: FONT_14,
      fontWeight: '700',
      color: COLOR_3
    }
  },
  sorder: {
    tab: {
      backgroundColor: BACKGROUNDCOLOR_WHITE,
      height: 50,
      borderBottomWidth: 1,
      borderBottomColor: COLOR_E
    },
    tabItem: {
      position: 'relative',
      justifyContent: 'center',
      borderBottomWidth: 1,
      borderBottomColor: BACKGROUNDCOLOR_WHITE
    },
    tabActive: {
      borderBottomColor: COLOR_BLUE
    },
    tabActiveText: {
      color: COLOR_BLUE
    },
    tabText: {
      textAlign: 'center',
      fontSize: FONT_12,
      color: COLOR_3
    },
    tabBadge: {
      position: 'absolute',
      backgroundColor: COLOR_RED,
      borderRadius: 5,
      top: -2,
      paddingLeft: 4,
      paddingRight: 4,
      height: 10,
      justifyContent: 'center'
    },
    tabBadgeText: {
      fontSize: FONT_8,
      color: BACKGROUNDCOLOR_WHITE,
    },
    tabTitleText: {
      fontSize: FONT_12
    },
    tabTitleUnderLine: {
      height: 1,
      backgroundColor: COLOR_BLUE
    },
    loadingTips: {
      color: COLOR_9,
      fontSize: FONT_12,
      padding: 5,
      textAlign: 'center'
    },
    type: {
      backgroundColor: BACKGROUNDCOLOR_WHITE,
      paddingTop: 15,
      paddingLeft: 10,
      paddingRight: 10
    },
    typeWrapper: {
      borderWidth: 1,
      borderColor: COLOR_BLUE,
      borderRadius: 2
    },
    typeItem: {
      paddingTop: 8,
      paddingBottom: 8,
      fontSize: FONT_14,
    },
    typeText: {
      textAlign: 'center',
      color: COLOR_BLUE,
      flex: 1
    },
    typeItemActive: {
      backgroundColor: COLOR_BLUE,
    },
    typeTextActive: {
      color: BACKGROUNDCOLOR_WHITE
    },
  },
  sorderItem: {
    item: {
      backgroundColor: BACKGROUNDCOLOR_WHITE,
      borderBottomWidth: 1,
      borderBottomColor: COLOR_E,
      marginBottom: 10,
      paddingBottom: 10
    },
    itemTitle: {
      paddingTop: 10,
      paddingLeft: 10,
      paddingBottom: 5,
      paddingRight: 10,
    },
    row: {
      flexDirection: 'row',
      marginBottom: 5
    },
    orderSn: {
      flex: 2,
      fontSize: FONT_12,
      color: COLOR_3
    },
    orderStatus: {
      flex: 1,
      fontSize: FONT_12,
      textAlign: 'right',
      color: COLOR_RED
    },
    itemBody: {
      padding: 10,
      flexDirection: 'row'
    },
    imgWrapper: {
      width: 80,
      height: 80,
      marginRight: 10
    },
    img: {
      width: 80,
      height: 80
    },
    info: {
      flex: 1
    },
    infoName: {
      fontSize: FONT_14,
      marginBottom: 5
    },
    infoAttr: {
      fontSize: FONT_14,
      color: COLOR_9,
      marginBottom: 5
    },
    infoData: {
      flexDirection: 'row'
    },
    infoPrice: {
      color: COLOR_RED,
      flex: 1
    },
    infoNum: {
      flex: 1,
      textAlign: 'right'
    },
    itemFooter: {
      marginTop: 10,
      paddingTop: 10,
      paddingLeft: 10,
      paddingRight: 10,
      borderTopWidth: 1,
      borderTopColor: COLOR_D,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end'
    },
    orderInfo: {
      fontSize: FONT_12,
      color: COLOR_A
    },
    goods: {
      backgroundColor: BACKGROUNDCOLOR_GRAY,
      marginBottom: 1
    },
    totalText: {
      paddingTop: 5,
      paddingLeft: 10,
      paddingRight: 10,
      textAlign: 'right',
      fontSize: FONT_12,
      color: COLOR_3
    },
    totalBig: {
      fontSize: FONT_16
    },
    refundCount: {
      paddingBottom: 10
    },
    refundCountText: {
      textAlign: 'right',
      fontSize: FONT_12,
      color: COLOR_3,
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 5,
      lineHeight: 18
    },
    refundCountSmall: {
      color: COLOR_RED
    },
    refundCountBig: {
      color: COLOR_RED,
      fontSize: FONT_16
    },
    totalCount: {
      textAlign: 'right',
      color: COLOR_RED,
      fontSize: FONT_12,
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 2
    }
  },
  btn: {
    container: {
      marginLeft: 10
    },
    primarySolid: {
      backgroundColor: COLOR_BLUE,
      paddingTop: 10,
      paddingBottom: 10
    },
    text: {
      color: BACKGROUNDCOLOR_WHITE,
      textAlign: 'center',
      fontSize: FONT_14
    },
    primary: {
      borderWidth: 1,
      borderRadius: 3,
      borderColor: COLOR_BLUE,
      color: COLOR_BLUE,
      paddingTop: 3,
      paddingLeft: 15,
      paddingBottom: 3,
      paddingRight: 15,
      fontSize: FONT_12,
    },
    danger: {
      borderWidth: 1,
      borderRadius: 3,
      borderColor: COLOR_RED,
      color: COLOR_RED,
      paddingTop: 3,
      paddingLeft: 15,
      paddingBottom: 3,
      paddingRight: 15,
      fontSize: FONT_12,
    }
  },
  login: {
    content: {
      backgroundColor: BACKGROUNDCOLOR_WHITE
    },
    logoImg: {
      width: 60,
      height: 60,
      alignSelf: 'center'
    },
    icon: {
      width: 18,
      height: 18
    },
    formControl: {
      marginLeft: 30,
      marginRight: 30,
      borderBottomWidth: 1,
      borderBottomColor: COLOR_D,
      marginBottom: 10,
      height: 40
    },
    input: {
      flex: 1
    },
    btn: {
      marginLeft: 30,
      marginRight: 30,
      marginTop: 40,
      marginBottom: 20,
      backgroundColor: COLOR_RED,
      color: BACKGROUNDCOLOR_WHITE,
      paddingTop: 12,
      paddingBottom: 12,
      borderRadius: 4
    },
    btnText: {
      color: BACKGROUNDCOLOR_WHITE,
      fontSize: FONT_12,
      textAlign: 'center'
    },
    findpw: {
      color: COLOR_9,
      textAlign: 'center',
      fontSize: FONT_12
    },
    passwordType: {
      marginLeft: 10
    }
  },
  fpw: {
    content: {
      backgroundColor: BACKGROUNDCOLOR_WHITE
    },
    form: {
      marginTop: 50,
      marginLeft: 30,
      marginRight: 30
    },
    formControl: {
      marginBottom: 5
    },
    formItem: {
      borderBottomWidth: 1,
      borderBottomColor: COLOR_D,
      height: 40
    },
    input: {
      flex: 1,
      color: COLOR_3,
      fontSize: FONT_12
    },
    label: {
      color: COLOR_3,
      fontSize: FONT_12,
      width: 50
    },
    send: {
      backgroundColor: COLOR_RED,
      color: BACKGROUNDCOLOR_WHITE,
      fontSize: FONT_12,
      borderRadius: 4,
      paddingTop: 8,
      paddingLeft: 10,
      paddingBottom: 8,
      paddingRight: 10,
      marginLeft: 8
    },
    sendDisabled: {
      backgroundColor: COLOR_D
    }
  },
  sorderDetail: {
    log: {
      backgroundColor: BACKGROUNDCOLOR_WHITE,
      paddingTop: 10,
      paddingBottom: 10,
      borderTopWidth: 1,
      borderTopColor: COLOR_E,
      borderBottomWidth: 1,
      borderBottomColor: COLOR_E,
      marginBottom: 10
    },
    logItem: {
      position: 'relative',
    },
    logLeft: {
      width: 16,
      position: 'absolute',
      top: 0,
      left: 15,
      bottom: 0,
    },
    logLine: {
      width: 1,
      backgroundColor: COLOR_D,
      marginLeft: 6
    },
    logLineActive: {
      marginTop: 18
    },
    logCircle: {
      width: 12,
      height: 12,
      backgroundColor: COLOR_D,
      borderRadius: 5,
      borderWidth: 3,
      borderColor: 'rgba(255, 255, 255, 0)',
      position: 'absolute',
      top: 15
    },
    logCircleActive: {
      backgroundColor: COLOR_BLUE,
      borderColor: 'rgba(4, 170, 255, .3)'
    },
    logRight: {
      marginLeft: 40,
      marginRight: 10,
      borderTopColor: BACKGROUNDCOLOR_GRAY,
      borderTopWidth: 1,
      paddingTop: 10,
      paddingBottom: 5
    },
    logRightActive: {
      borderTopWidth: 0
    },
    logText: {
      fontSize: FONT_12,
      color: COLOR_9,
      marginBottom: 5
    },
    logTextActive: {
      color: COLOR_BLUE,
    },
    block: {
      backgroundColor: BACKGROUNDCOLOR_WHITE,
      borderTopWidth: 1,
      borderTopColor: COLOR_E,
      borderBottomWidth: 1,
      borderBottomColor: COLOR_E,
      padding: 10,
      marginBottom: 10
    },
    userItem: {
      marginTop: 2,
      marginBottom: 2
    },
    userText: {
      fontSize: FONT_12,
      color: COLOR_6,
    },
    orderInfoText: {
      fontSize: FONT_12,
      color: COLOR_9,
      marginTop: 2,
      marginBottom: 2
    }
  },
  srefundDetail: {
    title: {
      fontSize: FONT_14,
      padding: 10,
      color: COLOR_3,
      backgroundColor: BACKGROUNDCOLOR_WHITE
    },
    info: {
      backgroundColor: BACKGROUNDCOLOR_WHITE,
      borderTopWidth: 1,
      borderTopColor: COLOR_E,
      marginTop: 10,
      paddingLeft: 10,
      paddingRight: 10
    },
    dl: {
      paddingTop: 10,
      paddingBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: COLOR_E
    },
    dt: {
      width: 80,
      color: COLOR_6,
      fontSize: FONT_12
    },
    dd: {
      color: COLOR_3,
      fontSize: FONT_12
    },
    ddr: {
      color: COLOR_RED,
      fontSize: FONT_12,
      textAlign: 'right'
    },
    order:  {
      backgroundColor: BACKGROUNDCOLOR_WHITE,
      borderTopWidth: 1,
      borderTopColor: COLOR_E,
      borderBottomWidth: 1,
      borderBottomColor: COLOR_E,
      marginTop: 10,
      marginBottom: 10,
      padding: 10
    },
    orderSn: {
      fontSize: 13,
      color: COLOR_3
    },
    orderTime: {
      fontSize: FONT_12,
      color: COLOR_9
    },
    or: {
      borderWidth: 1,
      borderColor: COLOR_E,
      paddingLeft: 10,
      paddingRight: 10,
      borderRadius: 3,
      height: 30,
      justifyContent : 'center'
    },
    ortxt: {
      fontSize: FONT_12,
      color: COLOR_3,
    },
    img: {
      width: 60,
      height: 60,
      marginRight: 5,
      marginBottom: 5,
      borderWidth: 1,
      borderColor: COLOR_D
    },
    imgContent: {
      flex: 1,
      flexWrap: 'wrap',
    }
  },
  footerBtn: {
    b1: {
      backgroundColor: COLOR_RED,
      justifyContent: 'center',
      alignItems: 'center',
      height: 39,
      borderTopWidth: 1,
      borderTopColor: COLOR_RED
    },
    b2: {
      backgroundColor: BACKGROUNDCOLOR_WHITE,
      justifyContent: 'center',
      alignItems: 'center',
      height: 39,
      borderTopWidth: 1,
      borderTopColor: COLOR_E
    },
    text: {
      color: BACKGROUNDCOLOR_WHITE,
      fontSize: FONT_12
    },
    text2: {
      color: COLOR_RED,
      fontSize: FONT_12
    }
  },
  sorderSearch: {
    inputContainer: {
      backgroundColor: COLOR_E,
      padding: 10
    },
    input: {
      backgroundColor: BACKGROUNDCOLOR_WHITE,
      paddingLeft: 5,
      paddingRight: 5,
      paddingTop: 0,
      paddingBottom: 0,
      height: 24,
      fontSize: FONT_12
    }
  },
  deliver: {
    container: {
      paddingLeft: 20,
      paddingRight: 20
    },
    title: {
      fontSize: FONT_16,
      textAlign: 'center',
      color: COLOR_3,
      marginTop: 20
    },
    typeText: {
      color: COLOR_3
    },
    label: {
      width: 70,
      color: COLOR_3,
      fontSize: FONT_14
    },
    item: {
      marginTop: 10,
      marginBottom: 5
    },
    radioGroup: {
      height: 30,
      padding: 0,
      margin: 0
    },
    itemBlock: {
      borderWidth: 1,
      borderColor: BACKGROUNDCOLOR_GRAY,
      borderRadius: 2,
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: 10,
      paddingRight: 10,
      margin: 0,
      position: 'relative',
      height: 36
    },
    multi: {
      height: 80
    },
    radio: {
      paddingLeft: 0
    },
    input: {
      color: COLOR_3,
      height: 36,
      padding: 0,
      margin: 0
    },
    textarea: {
      color: COLOR_3,
      height: 80,
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 5,
      paddingBottom: 5,
      margin: 0,
      textAlignVertical: 'top'
    },
    selectIcon: {
      width: 16,
      height: 16
    },
    select: {
      opacity: 0,
      position: 'absolute',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      zIndex: 2
    },
    selectText: {
      fontSize: FONT_14,
      color: COLOR_9
    },
    activeText: {
      color: COLOR_3
    },
    tips: {
      color: COLOR_3,
      fontSize: FONT_12,
      marginTop: 10,
      marginBottom: 10
    }
  },
  ewm: {
    container: {
      backgroundColor: 'rgba(0, 0, 0, .6)'
    }
  },
  sexamine: {
    info: {
      marginTop: 0,
      borderTopWidth: 0
    },
    time: {
      borderBottomWidth: 1,
      borderBottomColor: COLOR_E,
      paddingTop: 10,
      paddingBottom: 10,
      color: COLOR_3
    },
    order: {
      marginTop: 10,
      borderTopWidth: 1,
      borderTopColor: COLOR_E
    },
    borderNone: {
      borderBottomWidth: 0
    },
    modal: {
      backgroundColor: BACKGROUNDCOLOR_WHITE,
      borderRadius: 4,
    },
    mtitle: {
      backgroundColor: BACKGROUNDCOLOR_GRAY,
      paddingTop: 8,
      paddingBottom: 8,
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4
    },
    mtitleText: {
      textAlign: 'center',
      color: COLOR_3,
      fontSize: FONT_12,
    },
    mbody: {
      paddingLeft: 10,
      paddingRight: 10,
      height: 100,
      justifyContent: 'center'
    },
    tipsText: {
      textAlign: 'center',
      color: COLOR_3,
      fontSize: FONT_12,
    },
    checkbox: {
      marginBottom: 5
    },
    mfooter: {
      paddingBottom: 15,
      paddingLeft: 15,
      paddingRight: 15,
    },
    btn2: {
      borderColor: COLOR_BLUE,
      backgroundColor: COLOR_BLUE,
    },
    btn2Text: {
      color: BACKGROUNDCOLOR_WHITE
    }
  },
  refuse: {
    container: {
      paddingTop: 40,
    },
    label: {
      textAlign: 'right',
      paddingRight:  6
    },
    redText:{
      fontSize: FONT_12,
      color: COLOR_RED,
    }
  },
  form: {
    checkbox: {
      borderWidth: 1,
      borderColor: COLOR_A,
      width: 12,
      height: 12,
      marginRight: 5,
      borderRadius: 2,
      alignItems: 'center',
      justifyContent: 'center'
    },
    checked: {
      borderColor: COLOR_BLUE
    },
    checkboxActive: {
      width: 5,
      height: 5,
      backgroundColor: COLOR_BLUE
    },
    checkboxText: {
      fontSize: FONT_12,
      color: COLOR_3
    }
  },
  sgoods: {
    tab: {
      backgroundColor: BACKGROUNDCOLOR_WHITE,
      padding: 10
    },
    tabContainer: {
      borderWidth: 1,
      borderColor: COLOR_BLUE,
      borderRadius: 3
    },
    tabItem: {
      flex: 1,
    },
    tabFirst: {
      borderRightWidth: 1,
      borderColor: COLOR_BLUE,
    },
    tabLast: {
      borderLeftWidth: 1,
      borderLeftColor: COLOR_BLUE
    },
    tabText: {
      fontSize: FONT_14,
      textAlign: 'center',
      color: COLOR_BLUE,
      paddingTop: 5,
      paddingBottom: 5
    },
    tabActive: {
      backgroundColor: COLOR_BLUE,
      color: BACKGROUNDCOLOR_WHITE
    },
    search: {
      backgroundColor: BACKGROUNDCOLOR_GRAY,
      padding: 10,
      borderTopWidth: 1,
      borderColor: COLOR_E
    },
    searchForm: {
      backgroundColor: BACKGROUNDCOLOR_WHITE,
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: 8,
      paddingRight: 8,
      height: 24
    },
    searchInput: {
      padding: 0,
      color: COLOR_3
    },
    searchIcon: {
      width: 14,
      height: 14,
      marginLeft: 8
    },
    filter: {
      width: 14,
      height: 14,
      marginLeft: 10,
      marginRight: 3
    },
    filterText: {
      color: COLOR_BLUE
    },
    switchTitle: {
      backgroundColor: BACKGROUNDCOLOR_GRAY,
      borderBottomWidth: 1,
      borderColor: COLOR_E
    },
    switchItem: {
      justifyContent: 'center',
    },
    switchText: {
      fontSize: FONT_12,
      color: COLOR_3,
      paddingBottom: 5,
      borderBottomWidth: 2,
      borderColor: 'transparent',
    },
    switchActive: {
      color: COLOR_BLUE,
      borderColor: COLOR_BLUE
    }
  }
}
