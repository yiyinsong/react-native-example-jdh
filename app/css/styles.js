export default {
  //公用样式
  common: {
    init: {
      backgroundColor: '#f5f5f5'
    },
    initWhite: {
      backgroundColor: '#fff',
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
      backgroundColor: '#f5f5f5',
      height: 65,
      elevation: 0,
      shadowOpacity: 0,
      borderBottomColor: '#ddd',
      borderBottomWidth: 1,
      paddingTop: 20,
    },
    loadingTips: {
      color: '#999',
      fontSize: 12,
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
    confirm: {
      content: {
        backgroundColor: '#fff',
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
        fontSize: 14,
        marginBottom: 20
      },
      confirm: {
        borderRadius: 2,
        backgroundColor: '#fe5e5e',
        borderWidth: 1,
        borderColor: '#fe5e5e',
        paddingTop: 6,
        paddingBottom: 6,
        flex: 1,
        marginRight: 8
      },
      confirmText: {
        color: '#fff',
        fontSize: 12,
        textAlign: 'center'
      },
      cancel: {
        borderRadius: 2,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        paddingTop: 6,
        paddingBottom: 6,
        textAlign: 'center',
        flex: 1,
        marginLeft: 8
      },
      cancelText: {
        color: '#333',
        fontSize: 12,
        textAlign: 'center'
      },
    },
    prompt: {
      content: {
        backgroundColor: '#fff',
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
        color: '#fff',
        fontSize: 10,
        textAlign: 'center',
        backgroundColor: '#000',
        borderRadius: 3,
        paddingTop: 3,
        paddingBottom: 3,
      },
      text: {
        fontSize: 12,
        color: '#333',
        textAlign: 'center'
      },
      input: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#eee',
        height: 30,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 12
      },
      triangle: {
        width: 0,
        height: 0,
        borderLeftWidth: 3,
        borderLeftColor: 'transparent',
        borderRightWidth: 3,
        borderRightColor: 'transparent',
        borderTopWidth: 5,
        borderTopColor: '#000',
        alignSelf: 'center'
      }
    },
    address: {
      content: {
        backgroundColor: '#fff'
      },
      title: {
        padding: 10,
        position: 'relative'
      },
      titleText: {
        textAlign: 'center',
        fontSize: 14,
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
        fontSize: 12,
        color: '#666'
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
        borderBottomColor: '#eee'
      },
      tabItem: {
        fontSize: 12,
        color: '#666',
        paddingLeft: 10,

      },
      tabItemText: {
        fontSize: 12,
        color: '#666',
        paddingBottom: 5,
        borderBottomWidth: 2,
        borderBottomColor: '#fff'
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
      backgroundColor: '#fff'
    },
    h1: {
      fontSize: 18,
      textAlign: 'center',
      marginTop: 50,
      color: '#000',
    },
    h5: {
      fontSize: 11,
      textAlign: 'center',
      marginTop: 10,
      color: '#999',
    },
    icon: {
      resizeMode: 'contain',
      alignSelf: 'center'
    },
    iconText: {
      color: '#666',
      textAlign: 'center',
      marginTop: 5,
      fontSize: 12
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
      backgroundColor: '#0ea7fa',
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
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 15,
      paddingRight: 15,
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
      color: '#fff',
      fontSize: 12
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
      backgroundColor: '#fff',
      position: 'absolute',
      top: -4,
      right: -4
    },
    badgeText: {
      fontSize: 8,
      textAlign: 'center',
      lineHeight: 13,
      color: '#fe0000'
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
      fontSize: 14,
      color: '#fff'
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
      fontSize: 12
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
      backgroundColor: '#fff',
      marginBottom: 10
    },
    dt: {
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
      padding: 10
    },
    dtlIcon: {
      width: 12,
      height: 12,
      marginRight: 5
    },
    dtName: {
      fontSize: 12,
      color: '#000'
    },
    dtMore: {
      fontSize: 12,
      color: '#999',
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
      borderBottomColor: '#eee'
    },
    storeDataItem: {
      borderRightWidth: 1,
      borderRightColor: '#eee',
      flex: 1,
      marginTop: 10,
      marginBottom: 10,
      paddingTop: 5,
      paddingBottom: 5
    },
    storeDataIs: {
      fontSize: 12,
      color: '#000',
      fontWeight: '500',
      textAlign: 'center'
    },
    storeDataIe: {
      fontSize: 10,
      color: '#999',
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
      marginTop: 25,
      marginBottom: 25
    },
    orderContent: {
      position: 'relative',
      alignItems: 'center'
    },
    orderIcon: {
      width: 20,
      height: 20
    },
    orderText: {
      fontSize: 12,
      color: '#091c2f',
      marginTop: 5
    },
    orderBadge: {
      position: 'absolute',
      top: -5,
      right: 0,
      width: 14,
      height: 14,
      backgroundColor: '#ff5252',
      borderRadius: 7,
    },
    orderBadgeText: {
      color: '#fff',
      fontSize: 8,
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
      backgroundColor: '#ff7d15',
      right: -3,
      top: -3,
      zIndex: 1
    },
    messBadgeText: {
      textAlign: 'center',
      color: '#fff',
      fontSize: 8
    },
    messIcon: {
      width: 20,
      height: 20
    },
    storeInfoWrapper: {
      backgroundColor: '#fff',
      margin: 10,
      paddingLeft: 10,
      paddingRight: 10
    },
    storeInfoItemLeft: {
      textAlign: 'left',
      color: '#000',
      fontSize: 16
    },
    storeInfoItemRight: {
      textAlign: 'right',
      color: '#999'
    },
    storeInfoItem: {
      paddingTop: 15,
      paddingBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#eee'
    },
    address: {
      backgroundColor: '#fff',
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
      color: '#000',
      fontSize: 16
    },
    addrText: {
      color: '#999'
    },
    colorOrg: {
      color: '#ff7d15'
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
      borderColor: '#ff7d15',
      backgroundColor: '#fff',
      paddingTop: 15,
      paddingBottom: 15,
      borderRadius: 4
    },
    logoutText: {
      textAlign: 'center',
      color: '#ff7d15'
    }
  },
  //卖家地址管理
  saddr: {
    listDl: {
      backgroundColor: '#fff'
    },
    listDt: {
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
      padding: 10
    },
    listDtText: {
      fontSize: 12,
      color: '#999'
    },
    listDtTextActive: {
      fontSize: 12,
      color: '#ff7d15'
    },
    listDd: {
      borderTopWidth: 10,
      borderTopColor: '#f5f5f5',
    },
    footer: {
      backgroundColor: '#f5f5f5',
      borderTopWidth: 1,
      borderTopColor: '#eee',
      padding: 10,
    },
    footerBtn: {
      backgroundColor: '#0eaaff',
      color: '#fff',
      fontSize: 14,
      textAlign: 'center',
      paddingTop: 10,
      paddingBottom: 10,
      borderRadius: 4
    },
    item: {
      borderBottomWidth: 10,
      borderBottomColor: '#f5f5f5'
    },
    itemTop: {
      borderTopWidth: 1,
      borderTopColor: '#eee',
      paddingLeft: 10,
      paddingTop: 10,
      paddingRight: 10,
      paddingBottom: 5
    },
    itemUser: {
      fontSize: 14,
      color: '#333'
    },
    itemAddr: {
      fontSize: 12,
      color: '#999',
      paddingLeft: 10,
      paddingBottom: 10,
      paddingRight: 10
    },
    itemBottom: {
      borderTopWidth: 1,
      borderTopColor: '#eee',
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
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
      fontSize: 12,
      color: '#999'
    },
    add: {
      backgroundColor: '#fff'
    },
    group: {
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
      paddingLeft: 10,
      paddingRight: 10
    },
    addLabel: {
      fontSize: 12,
      color: '#999',
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
      backgroundColor: '#fff'
    },
    input: {
      fontSize: 12,
      color: '#333',
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
      borderBottomColor: '#eee',
      paddingTop: 10,
      paddingBottom: 10
    },
    moreName: {
      color: '#999',
      fontSize: 12
    },
    moreNum: {
      fontSize: 14,
      fontWeight: '700',
      color: '#333'
    }
  },
  sorder: {
    tab: {
      backgroundColor: '#fff',
      height: 50,
      borderBottomWidth: 1,
      borderBottomColor: '#f1f1f1'
    },
    tabItem: {
      position: 'relative',
      justifyContent: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#fff'
    },
    tabActive: {
      borderBottomColor: '#388bff'
    },
    tabActiveText: {
      color: '#388bff'
    },
    tabText: {
      textAlign: 'center',
      fontSize: 12,
      color: '#333'
    },
    tabBadge: {
      position: 'absolute',
      backgroundColor: '#eb0000',
      borderRadius: 5,
      top: -2,
      paddingLeft: 4,
      paddingRight: 4,
      height: 10,
      justifyContent: 'center'
    },
    tabBadgeText: {
      fontSize: 9,
      color: '#fff',
    },
    tabTitleText: {
      fontSize: 12
    },
    tabTitleUnderLine: {
      height: 1,
      backgroundColor: '#388bff'
    },
    loadingTips: {
      color: '#999',
      fontSize: 12,
      padding: 5,
      textAlign: 'center'
    },
    type: {
      backgroundColor: '#fff',
      paddingTop: 15,
      paddingLeft: 10,
      paddingRight: 10
    },
    typeWrapper: {
      borderWidth: 1,
      borderColor: '#0eaaff',
      borderRadius: 2
    },
    typeItem: {
      paddingTop: 8,
      paddingBottom: 8,
      fontSize: 14,
    },
    typeText: {
      textAlign: 'center',
      color: '#0eaaff',
      flex: 1
    },
    typeItemActive: {
      backgroundColor: '#0eaaff',
    },
    typeTextActive: {
      color: '#fff'
    },
  },
  sorderItem: {
    item: {
      backgroundColor: '#fff',
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
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
      fontSize: 12,
      color: '#333'
    },
    orderStatus: {
      flex: 1,
      fontSize: 12,
      textAlign: 'right',
      color: '#f23030'
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
      fontSize: 14,
      marginBottom: 5
    },
    infoAttr: {
      fontSize: 14,
      color: '#999',
      marginBottom: 5
    },
    infoData: {
      flexDirection: 'row'
    },
    infoPrice: {
      color: '#eb0000',
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
      borderTopColor: '#ddd',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end'
    },
    orderInfo: {
      fontSize: 12,
      color: '#aaa'
    },
    goods: {
      backgroundColor: '#f5f5f5',
      marginBottom: 1
    },
    totalText: {
      paddingTop: 5,
      paddingLeft: 10,
      paddingRight: 10,
      textAlign: 'right',
      fontSize: 12,
      color: '#333'
    },
    totalBig: {
      fontSize: 16
    },
    refundCount: {
      paddingBottom: 10
    },
    refundCountText: {
      textAlign: 'right',
      fontSize: 12,
      color: "#333",
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 5,
      lineHeight: 18
    },
    refundCountSmall: {
      color: '#cf0000'
    },
    refundCountBig: {
      color: '#cf0000',
      fontSize: 16
    },
    totalCount: {
      textAlign: 'right',
      color: '#cf0000',
      fontSize: 12,
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
      backgroundColor: '#0eaaff',
      paddingTop: 10,
      paddingBottom: 10
    },
    text: {
      color: '#fff',
      textAlign: 'center',
      fontSize: 14
    },
    primary: {
      borderWidth: 1,
      borderRadius: 3,
      borderColor: '#1eb0ff',
      color: '#1eb0ff',
      paddingTop: 3,
      paddingLeft: 15,
      paddingBottom: 3,
      paddingRight: 15,
      fontSize: 11,
    },
    danger: {
      borderWidth: 1,
      borderRadius: 3,
      borderColor: '#f23030',
      color: '#f23030',
      paddingTop: 3,
      paddingLeft: 15,
      paddingBottom: 3,
      paddingRight: 15,
      fontSize: 11,
    }
  },
  login: {
    content: {
      backgroundColor: '#fff'
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
      borderBottomColor: '#ccc',
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
      backgroundColor: '#f64848',
      color: '#fff',
      paddingTop: 12,
      paddingBottom: 12,
      borderRadius: 4
    },
    btnText: {
      color: '#fff',
      fontSize: 12,
      textAlign: 'center'
    },
    findpw: {
      color: '#c5c5c5',
      textAlign: 'center',
      fontSize: 12
    },
    passwordType: {
      marginLeft: 10
    }
  },
  fpw: {
    content: {
      backgroundColor: '#fff'
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
      borderBottomColor: '#ccc',
      height: 40
    },
    input: {
      flex: 1,
      color: '#333',
      fontSize: 12
    },
    label: {
      color: '#333',
      fontSize: 12,
      width: 50
    },
    send: {
      backgroundColor: '#fe5e5e',
      color: '#fff',
      fontSize: 12,
      borderRadius: 4,
      paddingTop: 8,
      paddingLeft: 10,
      paddingBottom: 8,
      paddingRight: 10,
      marginLeft: 8
    },
    sendDisabled: {
      backgroundColor: '#d8d8d8'
    }
  },
  sorderDetail: {
    log: {
      backgroundColor: '#fff',
      paddingTop: 10,
      paddingBottom: 10,
      borderTopWidth: 1,
      borderTopColor: '#eee',
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
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
      backgroundColor: '#ddd',
      marginLeft: 6
    },
    logLineActive: {
      marginTop: 18
    },
    logCircle: {
      width: 12,
      height: 12,
      backgroundColor: '#ddd',
      borderRadius: 5,
      borderWidth: 3,
      borderColor: 'rgba(255, 255, 255, 0)',
      position: 'absolute',
      top: 15
    },
    logCircleActive: {
      backgroundColor: '#0eaaff',
      borderColor: 'rgba(4, 170, 255, .3)'
    },
    logRight: {
      marginLeft: 40,
      marginRight: 10,
      borderTopColor: '#f5f5f5',
      borderTopWidth: 1,
      paddingTop: 10,
      paddingBottom: 5
    },
    logRightActive: {
      borderTopWidth: 0
    },
    logText: {
      fontSize: 12,
      color: '#999',
      marginBottom: 5
    },
    logTextActive: {
      color: '#0eaaff',
    },
    block: {
      backgroundColor: '#fff',
      borderTopWidth: 1,
      borderTopColor: '#eee',
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
      padding: 10,
      marginBottom: 10
    },
    userItem: {
      marginTop: 2,
      marginBottom: 2
    },
    userText: {
      fontSize: 12,
      color: '#666',
    },
    orderInfoText: {
      fontSize: 12,
      color: '#999',
      marginTop: 2,
      marginBottom: 2
    }
  },
  srefundDetail: {
    title: {
      fontSize: 14,
      padding: 10,
      color: '#333',
      backgroundColor: '#fff'
    },
    info: {
      backgroundColor: '#fff',
      borderTopWidth: 1,
      borderTopColor: '#eee',
      marginTop: 10,
      paddingLeft: 10,
      paddingRight: 10
    },
    dl: {
      paddingTop: 10,
      paddingBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#eee'
    },
    dt: {
      width: 80,
      color: '#666',
      fontSize: 12
    },
    dd: {
      color: '#333',
      fontSize: 12
    },
    ddr: {
      color: '#ff0000',
      fontSize: 12,
      textAlign: 'right'
    },
    order:  {
      backgroundColor: '#fff',
      borderTopWidth: 1,
      borderTopColor: '#eee',
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
      marginTop: 10,
      marginBottom: 10,
      padding: 10
    },
    orderSn: {
      fontSize: 13,
      color: '#333'
    },
    orderTime: {
      fontSize: 11,
      color: '#999'
    },
    or: {
      borderWidth: 1,
      borderColor: '#eee',
      paddingLeft: 10,
      paddingRight: 10,
      borderRadius: 3,
      height: 30,
      justifyContent : 'center'
    },
    ortxt: {
      fontSize: 12,
      color: '#333',
    },
  },
  footerBtn: {
    b1: {
      backgroundColor: '#fe5e5e',
      justifyContent: 'center',
      alignItems: 'center',
      height: 39,
      borderTopWidth: 1,
      borderTopColor: '#fe5e5e'
    },
    b2: {
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      height: 39,
      borderTopWidth: 1,
      borderTopColor: '#eee'
    },
    text: {
      color: '#fff',
      fontSize: 12
    },
    text2: {
      color: '#fe5e5e',
      fontSize: 12
    }
  },
  sorderSearch: {
    inputContainer: {
      backgroundColor: '#eee',
      padding: 10
    },
    input: {
      backgroundColor: '#fff',
      paddingLeft: 5,
      paddingRight: 5,
      paddingTop: 0,
      paddingBottom: 0,
      height: 24,
      fontSize: 12
    }
  },
  deliver: {
    container: {
      paddingLeft: 20,
      paddingRight: 20
    },
    title: {
      fontSize: 16,
      textAlign: 'center',
      color: "#000",
      marginTop: 20
    },
    typeText: {
      color: '#333'
    },
    label: {
      width: 70,
      color: '#333',
      fontSize: 14
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
      borderColor: '#f5f5f5',
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
      color: '#333',
      height: 36,
      padding: 0,
      margin: 0
    },
    textarea: {
      color: '#333',
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
      fontSize: 14,
      color: "#888"
    },
    activeText: {
      color: '#333'
    },
    tips: {
      color: '#333',
      fontSize: 12,
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
      borderBottomColor: '#eee',
      paddingTop: 10,
      paddingBottom: 10,
      color: '#333'
    },
    order: {
      marginTop: 10,
      borderTopWidth: 1,
      borderTopColor: '#eee'
    },
    borderNone: {
      borderBottomWidth: 0
    }
  },
  refuse: {
    container: {
      paddingTop: 40,
    },
    redText:{
      fontSize: 12,
      color: '#ff0000'
    }
  }
}
