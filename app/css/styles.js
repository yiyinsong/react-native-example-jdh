const BACKGROUNDCOLOR_GRAY = '#f5f5f5';
const BACKGROUNDCOLOR_GRAY2 = '#f4f4f4';
const BACKGROUNDCOLOR_WHITE = '#fff';

const COLOR_RED = '#f93b31';
const COLOR_BLUE = '#0386fc';
const COLOR_BLACK = '#000';
const COLOR_GRAY = '#f1f1f1';
const COLOR_ORANGE = '#ff9504';
const COLOR_WHITE = '#fff';
const COLOR_VIOLET = '#7079f2';
const COLOR_GREEN = '#76d05e';
const COLOR_A = '#aaa';
const COLOR_D = '#ddd';
const COLOR_3 = '#333';
const COLOR_6 = '#666';
const COLOR_9 = '#999';
const COLOR_E = '#eee';
const COLOR_F = '#fafafa';
const COLOR_SIGN_BG = '#fbf1f1';
const COLOR_GREEN2 = '#67cab2';

const FONT_8 = 8;
const FONT_10 = 10;
const FONT_11 = 11;
const FONT_12 = 12;
const FONT_13 = 13;
const FONT_14 = 14;
const FONT_16 = 16;
const FONT_18 = 18;
const FONT_24 = 24;
const FONT_30 = 30;

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
    header: {
      backgroundColor: COLOR_WHITE,
      height: 65,
      elevation: 0,
      shadowOpacity: 0,
      borderBottomColor: COLOR_D,
      borderBottomWidth: 1,
      paddingTop: 20,
    },
    headerTitle: {
        color: COLOR_3,
        fontSize: 16,
        alignSelf: 'center',
        fontWeight: '100'
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
    blueHeader: {
      backgroundColor: '#0386fc',
      color: '#fff',
      height: 65,
      elevation: 0,
      shadowOpacity: 0,
      borderBottomColor: '#0386fc',
      borderBottomWidth: 1,
      paddingTop: 20,
    },
    blueHeaderTitle: {
      color: '#fff',
      fontSize: 16,
      alignSelf: 'center',
      fontWeight: '100'
    }
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
      borderWidth: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      borderRadius: 4,
      padding: 4
    }
  },
  select: {
    down: {
      width: 0,
      height: 0,
      borderLeftWidth: 4,
      borderLeftColor: 'transparent',
      borderRightWidth: 4,
      borderRightColor: 'transparent',
      borderTopWidth: 4,
      borderTopColor: COLOR_3
    },
    downActive: {
      borderTopColor: COLOR_BLUE
    }
  },
  store: {
    top: {
      paddingTop: 30,
      paddingLeft: 15,
      paddingRight: 15
    },
    iconStore: {
      width: 14,
      height: 14
    },
    iconShare: {
      width: 18,
      height: 18,
      resizeMode: 'contain',
    },
    iconMessage: {
      width: 18,
      height: 16,
      resizeMode: 'contain',
      marginLeft: 15
    },
    storeText: {
      color: COLOR_WHITE,
      fontSize: FONT_12,
      marginLeft: 5
    },
    storeName: {
      color: COLOR_WHITE,
      fontSize: FONT_14,
      marginLeft: 20,
      marginRight: 20,
      textAlign: 'center'
    },
    today: {
      flex: 1,
      justifyContent: 'center',
      alignSelf: 'center'
    },
    todayNum: {
      textAlign: 'center',
      fontSize: FONT_24,
      color: COLOR_WHITE
    },
    todayText: {
      fontSize: FONT_12,
      color: COLOR_WHITE,
      textAlign: 'center'
    },
    dataNum: {
      fontSize: FONT_16,
      color: COLOR_WHITE,
      textAlign: 'center'
    },
    dataText: {
      fontSize: FONT_12,
      color: COLOR_WHITE,
      textAlign: 'center'
    },
    grid: {
      backgroundColor: COLOR_WHITE,
      flexWrap: 'wrap'
    },
    gridItem: {
      paddingTop: 15,
      paddingBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: COLOR_GRAY
    },
    icon: {
      width: 30,
      height: 30,
      resizeMode: 'contain'
    },
    iconText: {
      fontSize: FONT_12,
      color: COLOR_6,
      marginTop: 5
    },
    add: {
      marginTop: 15,
      borderWidth: 1,
      borderColor: COLOR_D,
      borderStyle: 'dashed',
      marginLeft: 40,
      marginRight: 40,
      paddingTop: 8,
      paddingBottom: 8
    },
    addIcon: {
      width: 18,
      height: 18,
      resizeMode: 'contain'
    },
    addText: {
      fontSize: FONT_12,
      color: COLOR_6,
      marginLeft: 5
    }
  },
  //卖家中心
  shome: {
    container: {
      flex: 1
    },
    head: {
      position: 'relative',
    },
    headContent: {
      paddingTop: 20,
    },
    ht: {
      alignItems: 'flex-start'
    },
    userBlock: {
      padding: 10,
      flexDirection: 'row',
    },
    userBlockLeft: {
      flex: 1,
      flexDirection: 'row',
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
      height: 20,
      resizeMode: 'contain'
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
    hb: {
      flexDirection: 'row',
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 2
    },
    logoContainer: {
      borderRadius: 30,
      width: 54,
      height: 54,
      padding: 2,
      backgroundColor: COLOR_WHITE,
      overflow: 'hidden'
    },
    userHeadIcon: {
      width: 50,
      height: 50,
      resizeMode: 'contain',
      borderRadius: 100,
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
      width: 18,
      height: 15,
    },
    userToOther: {
      flexDirection: 'row',
      alignItems: 'flex-end'
    },
    userQrcode: {
      width: 16,
      height: 16,
      marginLeft: 20,
      resizeMode: 'contain'
    },
    userInfo: {
      alignItems: 'flex-end',
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
    storeDataItem2: {
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
      borderRightColor: 'transparent',
      borderBottomWidth: 0,
      borderBottomColor: 'transparent',
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
      height: 20,
      resizeMode: 'contain'
    },
    orderText: {
      fontSize: FONT_12,
      color: COLOR_6,
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
      lineHeight: 12
    },
    borderNone: {
      borderBottomWidth: 0
    },
    goodsMana: {
      paddingTop: 15,
      paddingBottom: 15
    },
    gl: {
      borderRightWidth: 1,
      borderRightColor: COLOR_GRAY
    },
    goodsIcon: {
      width: 30,
      height: 30,
      resizeMode: 'contain'
    },
    goodsText: {
      fontSize: FONT_12,
      color: COLOR_6,
      marginTop: 5
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
      height: 42,
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
      height: 80,
      resizeMode: 'contain'
    },
    info: {
      flex: 1,
      flexWrap: 'wrap'
    },
    infoName: {
      fontSize: FONT_12,
      marginBottom: 5,
      color: COLOR_3,
      lineHeight: 18,
      height: 34
    },
    infoAttr: {
      fontSize: FONT_12,
      color: COLOR_9,
      marginBottom: 2
    },
    infoPrice: {
      color: COLOR_RED,
      fontSize: FONT_12,
      textAlign: 'right'
    },
    infoNum: {
      textAlign: 'right',
      fontSize: FONT_12
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
      paddingLeft: 5,
      paddingRight: 10,
      textAlign: 'right',
      fontSize: FONT_12,
      color: COLOR_3,
    },
    totalBig: {
      fontSize: FONT_16
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
    },
    account: {
      paddingTop: 5
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
    orangeSolid: {
      backgroundColor: COLOR_ORANGE,
      paddingTop: 10,
      paddingBottom: 10
    },
    text: {
      color: BACKGROUNDCOLOR_WHITE,
      textAlign: 'center',
      fontSize: FONT_14
    },
    defaults: {
      borderWidth: 1,
      borderRadius: 3,
      borderColor: COLOR_D,
      color: COLOR_3,
      paddingTop: 3,
      paddingLeft: 15,
      paddingBottom: 3,
      paddingRight: 15,
      fontSize: FONT_12,
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
    },
  },
  btn2: {
    default: {
      backgroundColor: COLOR_WHITE,
      color: COLOR_3,
      alignItems: 'center',
      paddingTop: 9,
      paddingBottom: 10,
      borderTopWidth: 1,
      borderTopColor: COLOR_D
    },
    defaultText: {
      color: COLOR_3,
      fontSize: FONT_14,
    },
    primary: {
      backgroundColor: COLOR_BLUE,
      alignItems: 'center',
      paddingTop: 10,
      paddingBottom: 10
    },
    primaryText: {
      color: COLOR_WHITE,
      fontSize: FONT_14,
    }
  },
  btn3: {
    defaults: {
      fontSize: FONT_12,
      color: COLOR_6,
      borderWidth: 1,
      borderColor: COLOR_D,
      paddingTop: 4,
      paddingLeft: 10,
      paddingBottom: 4,
      paddingRight: 10,
      borderRadius: 15
    },
    danger: {
      color: COLOR_RED,
      borderColor: COLOR_RED
    },
    green: {
      color: COLOR_GREEN,
      borderColor: COLOR_GREEN
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
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 8,
      paddingBottom: 8,
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
    },
    item: {
      marginLeft: 5,
      marginRight: 5,
      padding: 5,
      borderBottomWidth: 1,
      borderBottomColor: COLOR_GRAY,
      height: 91
    },
    iteml: {
      paddingRight: 10,
    },
    img: {
      width: 70,
      height: 70,
      marginRight: 8
    },
    text: {
      color: COLOR_3,
      fontSize: FONT_12,
      height: 30
    },
    textGray: {
      color: COLOR_9,
      fontSize: FONT_12,
      marginTop: 3
    },
    price: {
      color: COLOR_RED
    },
    stock: {
      color: COLOR_ORANGE
    },
    footer: {
      backgroundColor: BACKGROUNDCOLOR_WHITE,
      borderTopWidth: 1,
      borderTopColor: COLOR_GRAY,
      paddingTop: 8,
      paddingBottom: 8,
      paddingLeft: 10,
      paddingRight: 8
    },
    all: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center'
    },
    allText: {
      marginLeft: 5,
      color: COLOR_3,
      fontSize: FONT_12
    },
    itemTips: {
      color: COLOR_RED,
      fontSize: FONT_12
    },
    itemEdit: {
      width: 14,
      height: 14,
      resizeMode: 'contain',
      marginRight: 3
    },
    itemEditText: {
      fontSize: FONT_12,
      color: COLOR_3
    },
    copyBtn: {
      paddingLeft: 8,
      paddingRight: 8
    },
    filterBox: {
      backgroundColor: BACKGROUNDCOLOR_WHITE,
    },
    filterBtnCancel: {
      textAlign: 'center',
      color: COLOR_3,
      borderTopWidth: 1,
      borderTopColor: COLOR_D,
      fontSize: FONT_12,
      flex: 1,
      paddingTop: 12,
      paddingBottom: 12
    },
    filterBtnConfirm: {
      textAlign: 'center',
      borderTopWidth: 1,
      borderTopColor: COLOR_BLUE,
      color: COLOR_WHITE,
      backgroundColor: COLOR_BLUE,
      fontSize: FONT_12,
      flex: 1,
      paddingTop: 12,
      paddingBottom: 12
    },
    filterTitle: {
      fontSize: FONT_14,
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: COLOR_E,
      color: COLOR_3
    },
    filterTab: {
      borderBottomWidth: 5,
      borderBottomColor: COLOR_GRAY
    },
    filterTabItem: {
      paddingTop: 8,
      paddingBottom: 8
    },
    filterTabText: {
      fontSize: FONT_12,
      color: COLOR_3,
      marginRight: 3
    },
    filterTabTextActive: {
      color: COLOR_BLUE
    },
    filterItem: {
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 8,
      paddingBottom: 8,
      borderBottomWidth: 1,
      borderBottomColor: COLOR_GRAY,
      fontSize: FONT_12,
      color: COLOR_3
    },
    filterItemActive: {
      backgroundColor: COLOR_E
    },
    filterBrandActive: {
      color: COLOR_BLUE
    }
  },
  control: {
    checkbox: {
      borderWidth: 1,
      borderColor: COLOR_D,
      width: 18,
      height: 18,
      borderRadius: 9
    },
    checked: {
      width: 18,
      height: 18
    },
    checkboxSmall: {
      borderWidth: 1,
      borderColor: COLOR_D,
      width: 16,
      height: 16,
      borderRadius: 9
    },
    checkedSmall: {
      width: 16,
      height: 16
    },
  },
  sgoodsDetail: {
    header: {
      height: 65,
      borderBottomWidth: 1,
      borderBottomColor: COLOR_D,
      paddingTop: 20,
    },
    tab: {
      paddingRight: 60
    },
    tabText: {
      height: 43,
      textAlignVertical: 'center',
      color: COLOR_3
    },
    tabActive: {
      color: COLOR_RED,
      borderBottomWidth: 2,
      borderBottomColor: COLOR_RED
    },
    banner: {
      height: 200
    },
    bannerFooter: {
      position: 'relative'
    },
    indicatorContainer: {
      position: 'absolute',
      zIndex: 9,
      justifyContent: 'center',
      top: -20,
    },
    indicator: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: COLOR_D,
      margin: 3
    },
    indicatorActive: {
      backgroundColor: COLOR_RED
    },
    block: {
      padding: 10,
      borderBottomWidth: 8,
      borderBottomColor: COLOR_GRAY
    },
    title: {
      color: COLOR_3,
      fontSize: FONT_14,
      marginBottom: 10,
      lineHeight: 22
    },
    label: {
      borderWidth: 1,
      borderColor: COLOR_E,
      color: COLOR_RED,
      paddingTop: 2,
      paddingBottom: 2,
      paddingLeft: 5,
      paddingRight: 5,
      fontSize: FONT_12
    },
    price: {
      paddingTop: 10,
      fontSize: FONT_12,
      color: COLOR_RED
    },
    priceBig: {
      fontSize: FONT_16,
      fontWeight: '500'
    },
    attrDl: {
      marginTop: 10
    },
    attrDt: {
      fontSize: FONT_14,
      color: COLOR_3,
      width: 70
    },
    attrDd: {
      fontSize: FONT_12,
      color: COLOR_3,
      borderWidth: 1,
      borderColor: COLOR_E,
      paddingTop: 2,
      paddingLeft: 5,
      paddingBottom: 2,
      paddingRight: 5,
      marginLeft: 5
    },
    table: {
      margin: 10,
      borderLeftWidth: 1,
      borderLeftColor: COLOR_E,
      borderBottomWidth: 1,
      borderBottomColor: COLOR_E,
      borderRightWidth: 1,
      borderRightColor: COLOR_E
    },
    tableHead: {
      backgroundColor: COLOR_GRAY,
      padding: 8,
      fontSize: FONT_12,
      color: COLOR_3
    },
    tdl: {
      borderTopWidth: 1,
      borderTopColor: COLOR_E,
      borderRightWidth: 1,
      borderRightColor: COLOR_E,
      padding: 8,
      fontSize: FONT_12,
      color: COLOR_6,
      width: 100
    },
    tdr: {
      borderTopWidth: 1,
      borderTopColor: COLOR_E,
      padding: 8,
      fontSize: FONT_12,
      color: COLOR_6,
      flex: 1
    }
  },
  sgoodsEdit: {
    tips: {
      paddingTop: 20,
      paddingLeft: 40,
      paddingBottom: 20,
      paddingRight: 40,
      borderBottomWidth: 8,
      borderBottomColor: COLOR_GRAY
    },
    tipsImg: {
      width: 50,
      height: 50,
    },
    tipsText: {
      fontSize: FONT_12,
      color: COLOR_RED,
      marginTop: 10,
      lineHeight: 22
    },
    info: {
      borderBottomWidth: 8,
      borderBottomColor: COLOR_GRAY,
      paddingLeft: 10,
      paddingRight: 10
    },
    infoItem: {
      borderBottomWidth: 1,
      borderBottomColor: COLOR_GRAY,
      paddingTop: 8,
      paddingBottom: 8
    },
    infoDt: {
      color: COLOR_9,
      fontSize: FONT_12,
      width: 80
    },
    infoDd: {
      color: COLOR_3,
      fontSize: FONT_12
    },
    comb:{
      paddingLeft: 10,
      paddingRight: 10
    },
    h5: {
      fontSize: FONT_14,
      color: COLOR_3,
      fontWeight: '500',
      paddingTop: 8,
      paddingBottom: 8,
      borderBottomWidth: 1,
      borderBottomColor: COLOR_GRAY
    },
    combItem: {
      paddingTop: 8,
      paddingBottom: 8,
    },
    combTitle: {
      color: COLOR_RED,
      fontSize: FONT_12
    },
    delete: {
      width: 14,
      height: 14,
      marginRight: 3
    },
    label: {
      fontSize: FONT_12,
      color: COLOR_3,
      marginRight: 5
    },
    label2: {
      fontSize: FONT_11,
      color: COLOR_3,
      marginRight: 5
    },
    input: {
      borderWidth: 1,
      borderColor: COLOR_GRAY,
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: 5,
      paddingRight: 5,
      margin: 0,
      height: 30,
      flex: 1
    },
    input2: {
      borderWidth: 1,
      borderColor: COLOR_GRAY,
      padding: 5,
      margin: 0,
      height: 34,
      flex: 1
    },
    form: {
      borderBottomWidth: 1,
      borderBottomColor: COLOR_GRAY,
      paddingBottom: 10
    },
    group: {
      marginRight: 20
    }
  },
  cart: {
    headerRight: {
      height: 18,
      marginTop: 3,
      marginRight: 10,
    },
    headerRightText: {
      color: COLOR_3,
      fontSize: FONT_12,
    },
    store: {
      borderBottomWidth: 10,
      borderBottomColor: COLOR_F,
      borderTopWidth: 1,
      borderTopColor: COLOR_E
    },
    storeBorderNone: {
      borderTopWidth: 0
    },
    storeHeader: {
      backgroundColor: BACKGROUNDCOLOR_GRAY,
      padding: 10
    },
    storeHeaderText: {
      fontSize: FONT_14,
      color: COLOR_3,
      marginLeft: 10
    },
    item: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: COLOR_GRAY,
      flexDirection: 'row',
      alignItems: 'center'
    },
    img: {
      width: 78,
      height: 78,
      marginLeft: 10,
      marginRight: 10,
      borderWidth: 1,
      borderColor: COLOR_GRAY
    },
    goodsName: {
      fontSize: FONT_13,
      color: COLOR_3,
      lineHeight: 20,
      height: 38
    },
    attr: {
      fontSize: FONT_12,
    },
    price: {
      color: COLOR_RED,
    },
    num: {
      borderRadius: 3,
      borderWidth: 1,
      borderColor: COLOR_D,
    },
    calSub: {
      borderRightWidth: 1,
      borderRightColor: COLOR_D,
      width: 20,
      textAlign: 'center',
      fontSize: FONT_14,
      color: COLOR_3,
      lineHeight: 20,
      height: 22
    },
    calAdd: {
      borderLeftWidth: 1,
      borderLeftColor: COLOR_D,
      width: 20,
      textAlign: 'center',
      fontSize: FONT_14,
      color: COLOR_3,
      lineHeight: 20,
      height: 22
    },
    numInput: {
      padding: 0,
      margin: 0,
      height: 22,
      fontSize: FONT_12,
      textAlign: 'center'
    },
    footer: {
      borderTopWidth: 1,
      borderTopColor: COLOR_GRAY,
      paddingLeft: 10,
      height: 48
    },
    all: {
      color: COLOR_3,
      marginLeft: 10
    },
    settle: {
      backgroundColor: COLOR_RED,
      marginLeft: 10
    },
    settleText: {
      color: COLOR_WHITE,
      fontSize: FONT_12,
      width: 80,
      textAlign: 'center',
      textAlignVertical: 'center',
      height: 46
    },
    count: {
      fontSize: FONT_14,
      color: COLOR_3
    },
    seletNum: {
      fontSize: FONT_11,
      textAlign: 'right'
    },
    selectCurrentNum: {
      color: COLOR_RED
    },
    delete: {
      marginRight: 10
    }
  },
  order: {
    tabActive: {
      borderBottomColor: COLOR_RED
    },
    tabActiveText: {
      color: COLOR_RED
    },
    refundList: {
      backgroundColor: COLOR_WHITE,
      height: 400
    },
    refundHeader: {
      backgroundColor: COLOR_GRAY,
      alignItems: 'center',
      paddingTop: 5,
      paddingLeft: 10,
      paddingBottom: 5,
      paddingRight: 10
    },
    refundTitle: {
      fontSize: FONT_14,
      color: COLOR_3
    },
    refundClose: {
      width: 32,
      height: 32
    },
    refundBody: {
      padding: 10,
      flex: 1
    },
    refundDt: {
      backgroundColor: COLOR_GRAY,
      paddingTop: 8,
      paddingBottom: 8
    },
    refundDtText: {
      textAlign: 'center',
      fontSize: FONT_12
    },
    refundLastItem: {
      width: 20
    },
    refundDd: {
      paddingTop: 8,
      paddingBottom: 8,
      borderBottomWidth: 1,
      borderBottomColor: COLOR_GRAY
    },
    refundDdText: {
      textAlign: 'center',
      fontSize: FONT_12,
      color: COLOR_3
    },
    refundGoIcon: {
      width: 20,
      height: 20,
      resizeMode: 'contain',
      transform: [{rotateZ: ('180deg')}]
    }
  },
  orderItem: {
    footer: {
      paddingTop: 10,
      paddingLeft: 10,
      paddingRight: 10
    },
    account: {
      fontSize: FONT_12,
      color: COLOR_3
    },
    type: {
      backgroundColor: COLOR_RED,
      color: COLOR_WHITE,
      paddingLeft: 3,
      paddingRight: 3,
      marginRight: 5
    },
    type2: {
      backgroundColor: COLOR_VIOLET,
      color: COLOR_WHITE,
      paddingLeft: 3,
      paddingRight: 3,
      marginRight: 5
    },
    typeText: {
      fontSize: FONT_12,
      color: COLOR_WHITE
    },
    shopName: {
      fontSize: FONT_12,
      color: COLOR_3
    },
    infoPrice: {
      color: COLOR_RED,
      fontSize: FONT_12
    },
    infoNum: {
      color: COLOR_3,
      fontSize: FONT_12,
      marginLeft: 10
    },
    footer: {
      paddingLeft: 10,
      paddingTop: 10,
      paddingRight: 10
    },
    account: {
      fontSize: FONT_12,
      color: COLOR_3
    },
    refundStatus: {
      color: COLOR_RED,
      fontSize: FONT_12,
      borderWidth: 1,
      borderColor: COLOR_RED,
      paddingLeft: 5,
      paddingRight: 5,
      marginRight: 8,
      marginTop: 4,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10
    },
    onlyRefundLabel: {
      paddingLeft: 10,
      position: 'relative'
    },
    onlyRefundLabelRight: {
      marginTop: 5,
      paddingRight: 5,
      position: 'relative',
    },
    onlyRefundLabelContainer: {
      borderWidth: 1,
      borderColor: COLOR_RED,
      borderRadius: 3,
      paddingLeft: 3,
      paddingRight: 3,
    },
    onlyRefundLabelArrow: {
      borderRightWidth: 4,
      borderTopWidth: 4,
      borderBottomWidth: 4,
      borderRightColor: COLOR_RED,
      borderTopColor: 'transparent',
      borderBottomColor: 'transparent',
      width: 0,
      heiht: 0,
      position: 'absolute',
      left: 6,
      top: 5,
    },
    onlyRefundLabelArrowRight: {
      borderLeftWidth: 4,
      borderTopWidth: 4,
      borderBottomWidth: 4,
      borderLeftColor: COLOR_RED,
      borderTopColor: 'transparent',
      borderBottomColor: 'transparent',
      width: 0,
      heiht: 0,
      position: 'absolute',
      left: 44,
      top: 5,
    },
    onlyRefundLabelInset: {
      borderRightWidth: 4,
      borderTopWidth: 4,
      borderBottomWidth: 4,
      borderRightColor: COLOR_WHITE,
      borderTopColor: 'transparent',
      borderBottomColor: 'transparent',
      width: 0,
      heiht: 0,
      position: 'absolute',
      left: 7,
      top: 5,
    },
    onlyRefundLabelInsetRight: {
      borderLeftWidth: 4,
      borderTopWidth: 4,
      borderBottomWidth: 4,
      borderLeftColor: COLOR_WHITE,
      borderTopColor: 'transparent',
      borderBottomColor: 'transparent',
      width: 0,
      heiht: 0,
      position: 'absolute',
      left: 43,
      top: 5,
    },
    onlyRefundLabelText: {
      fontSize: FONT_12,
      color: COLOR_RED
    }
  },
  home: {
    header: {
      position: 'absolute',
      zIndex: 9,
      left: 0,
      right: 0,
      height: 73,
    },
    search: {
      borderRadius: 24,
      paddingTop: 8,
      paddingBottom: 8,
      paddingLeft: 15,
      paddingRight: 15,
      position: 'absolute',
      top: 30,
      left: 10,
      right: 10,
      zIndex: 10,
      backgroundColor: COLOR_WHITE
    },
    searchText: {
      color: COLOR_A
    },
    searchIcon: {
      width: 16,
      height: 16,
      marginRight: 5
    },
    swiperDot: {
      width: 8,
      height: 1,
      borderRadius: 0,
      backgroundColor: COLOR_WHITE
    },
    swiperDotActive: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: COLOR_WHITE
    },
    cateContainer: {
      backgroundColor: BACKGROUNDCOLOR_GRAY2,
      paddingBottom: 15,
      overflow: 'hidden'
    },
    cate: {
      backgroundColor: BACKGROUNDCOLOR_GRAY2,
      paddingTop: 15,
    },
    cateIcon: {
      width: 40,
      height: 40,
      marginBottom: 5
    },
    cateText: {
      fontSize: FONT_12
    },
    news: {
      backgroundColor: COLOR_WHITE,
      marginTop: 10,
      marginLeft: 10,
      marginRight: 10,
      paddingTop: 6,
      paddingBottom: 6,
      paddingLeft: 10,
      paddingRight: 10,
      borderRadius: 15,
      overflow: 'hidden'
    },
    newsIcon: {
      width: 74,
      height: 13,
    },
    newsAni: {
      marginLeft: 20,
      height: 16,
      overflow: 'hidden',
    },
    newsMore: {
      paddingLeft: 10,
      borderLeftWidth: 1,
      borderLeftColor: COLOR_D,
      marginLeft: 10,
      color: COLOR_9,
      fontSize: FONT_12
    },
    newsText: {
      fontSize: FONT_12,
      color: COLOR_3,
      height: 24
    },
    ad: {
      overflow: 'hidden'
    },
    ad1: {
      borderTopWidth: 1,
      borderTopColor: COLOR_D,
      borderRightWidth: 1,
      borderRightColor: COLOR_D
    },
    ad2: {
      borderTopWidth: 1,
      borderTopColor: COLOR_D,
    },
    ad3: {
      borderBottomWidth: 1,
      borderBottomColor: COLOR_D
    },
    ad4: {
      borderTopWidth: 1,
      borderTopColor: COLOR_D,
      borderBottomWidth: 1,
      borderBottomColor: COLOR_D
    },
    floor: {
      overflow: 'hidden'
    },
    floorHeader: {
      paddingTop: 15,
      paddingBottom: 10
    },
    floorLine: {
      backgroundColor: COLOR_RED,
      width: 50,
      height: 1,
      marginLeft: 15,
      marginRight: 15
    },
    floorIcon: {
      width: 22,
      height: 22,
    },
    floorText: {
      fontSize: FONT_16,
      color: COLOR_RED,
      marginLeft: 5
    },
    floorTab: {
      borderBottomWidth: 1,
      borderBottomColor: BACKGROUNDCOLOR_GRAY2
    },
    floorTabText: {
      paddingTop: 10,
      paddingBottom: 10,
      fontSize: FONT_12,
      color: COLOR_3,
      borderBottomWidth: 1,
      borderBottomColor: COLOR_WHITE
    },
    floorTabTextActive: {
      color: COLOR_RED,
      borderBottomColor: COLOR_RED
    },
    floorTabContainer: {
      backgroundColor: BACKGROUNDCOLOR_GRAY2,
      paddingBottom: 10
    },
    floorSv: {
      paddingLeft: 5,
    },
    goods: {
      backgroundColor: COLOR_WHITE,
      marginRight: 5,
      overflow: 'hidden'
    },
    goodsName: {
      padding: 5,
      fontSize: FONT_12,
      color: COLOR_3
    },
    goodsPrice: {
      fontSize: FONT_14,
      color: COLOR_RED,
      fontWeight: '700',
      paddingLeft: 5,
      paddingBottom: 10,
      paddingRight: 5
    },
    hotHeader: {
      backgroundColor: COLOR_WHITE
    },
    hotTabContainer: {
      backgroundColor: COLOR_WHITE
    },
    hot1: {
      borderTopWidth: 1,
      borderTopColor: COLOR_GRAY,
      borderRightWidth: 1,
      borderRightColor: COLOR_GRAY,
      borderBottomWidth: 1,
      borderBottomColor: COLOR_GRAY,
      paddingTop: 10,
    },
    hot2: {
      borderRightWidth: 0
    },
    hotText: {
      color: COLOR_3,
      fontSize: FONT_14,
      marginBottom: 5
    },
    hotTextActive: {
      color: COLOR_RED
    },
    triangle: {
      width: 0,
      height: 0,
      borderLeftWidth: 6,
      borderLeftColor: 'transparent',
      borderRightWidth: 6,
      borderRightColor: 'transparent',
      borderBottomWidth: 8,
      borderBottomColor: COLOR_GRAY,
    },
    hotList: {
      backgroundColor: BACKGROUNDCOLOR_GRAY,
      flexWrap: 'wrap',
      overflow: 'hidden'
    },
    hotItem: {
      backgroundColor: COLOR_WHITE,
      marginTop: 5,
      paddingBottom: 10
    },
    hotGoodsName: {
      paddingTop: 5,
      paddingLeft: 10,
      paddingBottom: 5,
      paddingRight: 10,
      fontSize: FONT_12,
      color: COLOR_3
    },
    hotGoodsPrice: {
      color: COLOR_RED,
      fontSize: FONT_14,
      paddingLeft: 10,
      paddingRight: 10
    },
    hotLoadTips: {
      backgroundColor: BACKGROUNDCOLOR_GRAY
    },
    newsImgContainer: {
      backgroundColor: COLOR_WHITE,
      padding: 10,
      borderRadius: 8
    }
  },
  search: {
    searchContainer: {
      backgroundColor: COLOR_GRAY,
      borderRadius: 20,
      marginLeft: 8,
      marginRight: 10,
      paddingLeft: 10,
      paddingRight: 10
    },
    input: {
      margin: 0,
      padding: 0,
      flex: 1,
      marginLeft: 5,
      fontSize: FONT_12
    },
    icon: {
      width: 16,
      height: 16
    },
    btn: {
      color: COLOR_WHITE,
      backgroundColor: COLOR_BLUE,
      marginRight: 10,
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 5,
      paddingBottom: 5,
      borderRadius: 5
    },
    body: {
      padding: 10
    },
    recent: {
      fontSize: FONT_12,
      color: COLOR_3
    },
    clear: {
      fontSize: FONT_12,
      color: COLOR_BLUE
    },
    history: {
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    historyText: {
      backgroundColor: BACKGROUNDCOLOR_GRAY,
      borderWidth: 1,
      borderColor: COLOR_E,
      color: COLOR_9,
      fontSize: FONT_14,
      marginTop: 10,
      marginRight: 10,
      paddingTop: 5,
      paddingLeft: 10,
      paddingBottom: 5,
      paddingRight: 10,
      borderRadius: 20
    }
  },
  sign: {
    tipsLink: {
      position: 'absolute',
      top: 30,
      right: 10,
      zIndex: 9
    },
    tipsIcon: {
      width: 22,
      height: 22
    },
    signedText: {
      fontSize: FONT_12,
      color: COLOR_6,
      marginTop: 25
    },
    signedDay: {
      color: COLOR_RED
    },
    date: {
      color: COLOR_3,
      fontSize: FONT_14,
      textAlign: 'center',
      paddingTop: 20,
      paddingBottom: 20
    },
    table: {
      paddingLeft: 10,
      paddingRight: 10,
    },
    week: {
      fontSize: FONT_14,
      textAlign: 'center',
      color: COLOR_6
    },
    tbody: {
      flexWrap: 'wrap',
      marginTop: 10,
      borderRightWidth: 1,
      borderRightColor: COLOR_E,
      borderBottomWidth: 1,
      borderBottomColor: COLOR_E,
    },
    day: {
      borderLeftWidth: 1,
      borderLeftColor: COLOR_E,
      borderTopWidth: 1,
      borderTopColor: COLOR_E,
      height: 40,
      position: 'relative',
    },
    dayText: {
      fontSize: FONT_12,
      textAlign: 'center'
    },
    dayActive: {
      backgroundColor: COLOR_SIGN_BG
    },
    daySignIcon: {
      width: 12,
      height: 12,
      resizeMode: 'contain',
      position: 'absolute',
      right: 0,
      bottom: 0,
    },
    tips: {
      backgroundColor: COLOR_WHITE,
      borderRadius: 5,
      marginLeft: 15,
      marginRight: 15,
      padding: 20
    },
    tipsTitle: {
      fontSize: FONT_18,
      textAlign: 'center',
      color: COLOR_3,
      marginBottom: 20
    },
    tipsText: {
      fontSize: FONT_12,
      marginBottom: 3
    },
    tipsLine: {
      backgroundColor: 'rgba(255, 255, 255, .6)',
      width: 1,
      height: 40
    },
    tipsClose: {
      width: 40,
      height: 40,
      resizeMode: 'contain'
    },
    ticketMsg: {
      color: COLOR_RED,
      fontSize: FONT_16,
      textAlign: 'center'
    },
    ticketCancel: {
      borderWidth: 1,
      borderColor: COLOR_E,
      borderRadius: 4,
      marginTop: 20,
      marginRight: 10,
      justifyContent: 'center',
      paddingTop: 10,
      paddingBottom: 10
    },
    ticketCancelText: {
      fontSize: FONT_14,
      color: COLOR_6
    },
    ticketConfirm: {
      borderWidth: 1,
      borderColor: COLOR_RED,
      borderRadius: 4,
      marginTop: 20,
      marginLeft: 10,
      justifyContent: 'center',
      paddingTop: 10,
      paddingBottom: 10,
      backgroundColor: COLOR_RED
    },
    ticketConfirmText: {
      fontSize: FONT_14,
      color: COLOR_WHITE
    },
    signedImg: {
      resizeMode: 'contain'
    },
    signedTitle: {
      fontSize: 20,
      color: COLOR_3,
      textAlign: 'center'
    },
    signedOkText: {
      fontSize: FONT_14,
      textAlign: 'center',
      marginBottom: 10
    },
    signed: {
      position: 'relative'
    },
    signCloseAbsolute: {
      position: 'absolute',
      zIndex: 9,
      top: 0,
      right: 0,
    },
    signedClose: {
      width: 30,
      height: 30
    }
  },
  buyer: {
    attention: {
      paddingBottom: 10
    },
    attentionItem: {
      marginLeft: 10,
      marginRight: 10,
      marginTop: 10,
      overflow: 'hidden'
    },
    attentionImg: {
      resizeMode: 'contain'
    },
    attentionText: {
      fontSize: FONT_12,
      color: COLOR_3,
      height: 36,
      lineHeight: 18
    },
    attentionType: {
      borderWidth: 1,
      borderColor: COLOR_RED,
      borderRadius: 3,
      color: COLOR_RED,
      fontSize: FONT_10,
      paddingLeft: 3,
      paddingRight: 3,
      marginTop: 5,
      marginRight: 5
    },
    attentionUnderSale: {
      backgroundColor: 'rgba(0, 0, 0, .6)',
      textAlign: 'center',
      textAlignVertical: 'center',
      fontSize: FONT_12,
      color: COLOR_WHITE
    },
    ticket: {
      paddingTop: 15,
      paddingBottom: 15
    },
    tl: {
      borderRightWidth: 1,
      borderRightColor: COLOR_GRAY
    },
    ticketIcon: {
      width: 24,
      height: 17
    },
    ticketText: {
      fontSize: FONT_13,
      color: COLOR_3
    },
    ticketBottomText: {
      marginTop: 5
    }
  },
  refundItem: {
    totalText: {
      fontSize: FONT_12,
      color: COLOR_3,
      marginRight: 10
    },
    totalTextActive: {
      color: COLOR_RED
    }
  },
  orderDetail: {
    top: {
      backgroundColor: COLOR_WHITE,
      padding: 10,
      marginBottom: 10
    },
    orderInfoText:{
      fontSize: FONT_12,
      color: COLOR_3,
    },
    oitl: {
      fontSize: FONT_12,
      color: COLOR_3,
      lineHeight: 20
    },
    oitr: {
      fontSize: FONT_12,
      color: COLOR_RED,
      lineHeight: 20
    },
    log: {
      borderTopWidth: 1,
      borderTopColor: COLOR_GRAY,
      paddingTop: 5,
      marginTop: 10
    },
    car: {
      width: 16,
      height: 16,
      resizeMode: 'contain'
    },
    carArrow: {
      width: 14,
      height: 14,
      resizeMode: 'contain'
    },
    logInfo: {
      marginLeft: 8,
      marginRight: 8
    },
    logProgress: {
      fontSize: FONT_14,
      color: COLOR_3
    },
    logTime: {
      fontSize: FONT_12,
      color: COLOR_9
    },
    addrIcon: {
      width: 16,
      height: 16
    },
    addrInfo: {
      marginLeft: 8
    },
    addrUser: {
      fontSize: FONT_14,
      color: COLOR_3,
      lineHeight: 18
    },
    addrDetail: {
      fontSize: FONT_12,
      color: COLOR_9,
      lineHeight: 18
    },
    account: {
      backgroundColor: COLOR_WHITE,
      padding: 10
    },
    accountItem: {
      marginTop: 5
    },
    ail: {
      fontSize: FONT_14,
      color: COLOR_9
    },
    air: {
      fontSize: FONT_14,
      color: COLOR_RED
    },
    accountFooter: {
      borderTopWidth: 1,
      borderTopColor: COLOR_GRAY,
      marginTop: 8,
      paddingTop: 8
    },
    bottom: {
      marginTop: 10,
      borderTopWidth: 0
    },
    btnArea: {
      backgroundColor: COLOR_WHITE,
      borderTopWidth: 1,
      borderTopColor: COLOR_E,
      padding: 10,
    },
    onlyRefundLabel: {
      paddingRight: 10,
      position: 'relative'
    },
    onlyRefundLabelArrow: {
      borderLeftWidth: 4,
      borderTopWidth: 4,
      borderBottomWidth: 4,
      borderLeftColor: COLOR_RED,
      borderTopColor: 'transparent',
      borderBottomColor: 'transparent',
      width: 0,
      heiht: 0,
      position: 'absolute',
      right: 6,
      top: 5,
    },
    onlyRefundLabelInset: {
      borderLeftWidth: 4,
      borderTopWidth: 4,
      borderBottomWidth: 4,
      borderLeftColor: COLOR_WHITE,
      borderTopColor: 'transparent',
      borderBottomColor: 'transparent',
      width: 0,
      heiht: 0,
      position: 'absolute',
      right: 7,
      top: 5,
    },
  },
  refundDetail: {
    dl: {
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 10,
      borderBottomWidth: 8,
      borderBottomColor: COLOR_GRAY
    },
    dt: {
      fontSize: FONT_14,
      color: COLOR_3,
      paddingTop: 10,
      paddingBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: COLOR_GRAY
    },
    dd: {
      marginTop: 10
    },
    text1: {
      fontSize: FONT_12,
      color: COLOR_9,
    },
    text2: {
      fontSize: FONT_12,
      color: COLOR_6,
      marginLeft: 10
    },
    imgGroup: {
      flexWrap: 'wrap'
    },
    img: {
      width: 60,
      height: 60,
      marginTop: 5,
      marginRight: 5
    },
    progress: {

    },
    circle: {
      width: 10,
      height: 10,
      backgroundColor: COLOR_E,
      borderRadius: 10
    },
    circleActive: {
      backgroundColor: COLOR_RED
    },
    line: {
      width: 1,
      flex: 1,
      backgroundColor: COLOR_E
    },
    time: {
      marginLeft: 10,
      fontSize: FONT_12,
      color: COLOR_9
    },
    timeActive: {
      color: COLOR_RED
    },
    detail: {
      fontSize: FONT_12,
      color: COLOR_9,
      marginLeft: 20,
      paddingBottom: 10
    },
    detailActive: {
      color: COLOR_RED
    },
    viewGoodsBtnText: {
      fontSize: FONT_12,
      color: COLOR_BLUE
    },
    viewGoodsBtnImg: {
      width: 13,
      height: 12,
      resizeMode: 'contain'
    }
  },
  pay: {
    block: {
      backgroundColor: COLOR_WHITE,
      marginBottom: 10,
      paddingBottom: 10
    },
    orderItem: {
      paddingTop: 10,
      paddingLeft: 10,
      paddingRight: 10
    },
    ol: {
      fontSize: FONT_14,
      color: COLOR_9,
      marginRight: 10
    },
    or: {
      fontSize: FONT_14,
      color: COLOR_3,
    },
    redText: {
      fontSize: FONT_14,
      color: COLOR_RED
    },
    money: {
      padding: 10
    },
    item: {
      borderTopWidth: 1,
      borderTopColor: COLOR_GRAY,
      padding: 10,
    },
    text: {
      fontSize: FONT_14,
      color: COLOR_3
    },
    radio: {
      width: 20,
      height: 20,
      borderWidth: 1,
      borderColor: COLOR_E,
      borderRadius: 22
    },
    radioActive: {
      borderColor: COLOR_BLUE
    },
    radioImg: {
      width: 18,
      height: 18,
      resizeMode: 'contain'
    },
    submit: {
      backgroundColor: COLOR_ORANGE,
      flex: 1,
      margin: 10,
      borderRadius: 3
    },
    submitText: {
      color: COLOR_WHITE,
      paddingTop: 10,
      paddingBottom: 10,
      textAlign: 'center'
    }
  },
  attention: {
    filter: {
      backgroundColor: COLOR_WHITE,
      borderBottomWidth: 1,
      borderBottomColor: COLOR_GRAY
    },
    filterText: {
      fontSize: FONT_12,
      paddingTop: 10,
      paddingBottom: 10,
      color: COLOR_3,
      marginRight: 5
    },
    panel: {
      position: 'absolute',
      left: 0,
      bottom: 0,
      right: 0,
      top: 78,
      backgroundColor: COLOR_WHITE
    },
    cateItem: {
      borderBottomWidth: 1,
      borderBottomColor: COLOR_GRAY,
      padding: 10,
      fontSize: FONT_12,
      color: COLOR_6
    },
    cateItemActive: {
      backgroundColor: BACKGROUNDCOLOR_GRAY,
      color: COLOR_RED
    }
  },
  icon: {
    arrowUp: {
      borderLeftWidth: 4,
      borderRightWidth: 4,
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderBottomWidth: 4,
      borderBottomColor: COLOR_3
    },
    arrowDown: {
      borderLeftWidth: 4,
      borderRightWidth: 4,
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderTopWidth: 4,
      borderTopColor: COLOR_3
    },
  },
  attentionItem: {
    container: {

    },
    item: {
      padding: 10,
    },
    img: {
      width: 80,
      height: 80,
      borderWidth: 1,
      borderColor: COLOR_GRAY,
      marginRight: 5
    },
    info: {
      borderBottomWidth: 1,
      borderBottomColor: COLOR_GRAY
    },
    goodsName: {
      fontSize: FONT_12,
      color: COLOR_3,
      marginBottom: 10
    },
    type: {
      borderWidth: 1,
      fontSize: FONT_11,
      paddingLeft: 5,
      paddingRight: 5,
      height: 17,
      marginRight: 5,
      borderRadius: 2
    },
    type1: {
      borderColor: COLOR_RED,
      color: COLOR_RED,
    },
    type2: {
      borderColor: COLOR_GREEN2,
      color: COLOR_GREEN2,
    },
    type3: {
      borderColor: COLOR_ORANGE,
      color: COLOR_ORANGE,
    },
    type4: {
      backgroundColor: COLOR_RED,
      color: COLOR_WHITE,
      borderWidth: 0,
      borderColor: 'transparent'
    },
    price: {
      fontSize: FONT_12,
      color: COLOR_6
    },
    priceRed: {
      color: COLOR_RED
    },
    underSale: {
      backgroundColor: 'rgba(0, 0, 0, .6)',
      color: COLOR_WHITE,
      textAlign: 'center',
      textAlignVertical: 'center',
      fontSize: FONT_12
    }
  },
  news: {
    moreContainer: {
      backgroundColor: COLOR_WHITE
    },
    img: {
      alignSelf: 'center',
      resizeMode: 'contain',
      overflow: 'hidden'
    }
  },
  vrg: {
    item: {
      paddingTop: 10,
      paddingBottom: 10,
      borderBottomWidth: 1,
      marginLeft: 10,
      marginRight: 10,
      borderBottomColor: COLOR_GRAY
    },
    info: {
      marginLeft: 10
    },
    itemImg: {
      width: 60,
      height: 60,
    },
    itemGoodsName: {
      fontSize: FONT_14,
      color: COLOR_3
    },
    itemAttr: {
      fontSize: FONT_12,
      color: COLOR_9,
      marginTop: 2
    },
    others: {
      marginTop: 5
    },
    othersText: {
      fontSize: FONT_12,
      color: COLOR_6,
      marginRight: 20
    },
    othersActive: {
      color: COLOR_RED,
    },
    footer: {
      backgroundColor: COLOR_GRAY
    },
    account: {
      fontSize: FONT_12,
      color: COLOR_3,
      marginLeft: 10
    },
    accountActive: {
      color: COLOR_RED
    },
    closeBtn: {
      fontSize: FONT_12,
      textAlign: 'center',
      textAlignVertical: 'center',
      backgroundColor: COLOR_RED,
      color: COLOR_WHITE,
      width: 80,
      height: 48
    }
  },
  swiper: {
    back: {
      position: 'absolute',
      top: 10,
      left: 10,
      zIndex: 3,
      borderWidth: 1,
      borderColor: COLOR_WHITE,
      width: 30,
      height: 30,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center'
    },
    backArrow: {
      resizeMode: 'contain',
      width: 15
    },
    container: {
      backgroundColor: COLOR_BLACK,
      flex:1,
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      justifyContent:'center',
      alignItems:'center'
    },
    wrapper: {
      positon: 'absolute',
      zIndex: 2,
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      flex: 1
    }
  },
  refundApply: {
    block: {
      padding: 10,
      backgroundColor: COLOR_WHITE,
      marginBottom: 10
    },
    title: {
      color: COLOR_3,
      borderBottomWidth: 1,
      borderBottomColor: COLOR_E,
      paddingBottom: 8,
      fontSize: FONT_12,
      marginBottom: 5
    },
    item: {
      paddingTop: 5
    },
    typeText: {
      color: COLOR_3,
      fontSize: FONT_12,
      marginLeft: 5
    },
    typeTextActive: {
      color: COLOR_RED
    },
    typeGrayText: {
      color: COLOR_9
    },
    select: {
      borderWidth: 1,
      borderColor: COLOR_E,
      borderRadius: 4,
      position: 'relative',
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 8,
      paddingBottom: 8,
      marginTop: 5,
      marginBottom: 5
    },
    selectText: {
      color: COLOR_3,
      fontSize: FONT_12
    },
    placeholder: {
      color: COLOR_9
    },
    selectIcon: {
      width: 14,
      height: 14,
      resizeMode: 'contain'
    },
    selectGoodsBtn: {
      backgroundColor: COLOR_RED,
      color: COLOR_WHITE,
      fontSize: FONT_12,
      borderRadius: 4,
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 6,
      paddingBottom: 6,
      borderWidth: 1,
      borderColor: COLOR_D
    },
    selectGoods: {
      marginTop: 5
    },
    selectGoodsResult: {
      fontSize: FONT_12,
      marginLeft: 10,
      color: COLOR_9
    },
    selectGoodsResultActive: {
      color: COLOR_RED
    },
    moneyInput: {
      borderWidth: 1,
      borderColor: COLOR_D,
      width: 150,
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: 5,
      paddingRight: 5,
      margin: 0,
      fontSize: FONT_12,
      borderRadius: 4,
      height: 30
    },
    moneyText: {
      fontSize: FONT_12,
      color: COLOR_RED,
      flex: 1,
      textAlign: 'right'
    },
    desc: {
      marginTop: 5
    },
    descTextarea: {
      flex: 1,
      borderWidth: 1,
      borderColor: COLOR_D,
      padding: 5,
      margin: 0,
      fontSize: FONT_12,
      borderRadius: 4,
      height: 80,
      textAlignVertical: 'top'
    },
    img: {
      marginTop: 5
    },
    addBtn: {
      borderWidth: 1,
      borderColor: COLOR_D,
      backgroundColor: COLOR_GRAY,
      width: 60,
      height: 60
    },
    addText: {
      color: COLOR_D,
      fontSize: FONT_30
    },
    btn: {
      height: 40,
    },
    submit: {
      backgroundColor: COLOR_RED,
      flex: 1,
      justifyContent: 'center'
    },
    submitText: {
      color: COLOR_WHITE,
      fontSize: FONT_14,
      textAlign: 'center',
    },
    goodsItemImg: {
      marginLeft: 10
    },
    goodsItemText1: {
      color: COLOR_3,
      fontSize: FONT_12
    },
    goodsItemText2: {
      color: COLOR_9,
      fontSize: FONT_12
    },
    goodsItemText3: {
      color: COLOR_RED
    },
    goodsItemInput: {
      borderWidth: 1,
      borderColor: COLOR_D,
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: 5,
      paddingRight: 5,
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 5,
      fontSize: FONT_12,
      height: 20,
      textAlign: 'center'
    },
    goodsItemInfo: {
      marginBottom: 5
    },
    goodsItemCheck: {
      marginTop: 22
    }
  }
}
