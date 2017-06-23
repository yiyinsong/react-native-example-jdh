export default {
  //公用样式
  common: {
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
    }
  },
  //买家买家入口
  entrance: {
    wrapper: {
      backgroundColor: '#fff'
    },
    h1: {
      fontSize: 20,
      textAlign: 'center',
      marginTop: 50,
      color: '#000',
    },
    h5: {
      fontSize: 12,
      textAlign: 'center',
      marginTop: 10,
      color: '#333',
    },
    icon: {
      resizeMode: 'contain',
      alignSelf: 'center'
    },
    iconText: {
      color: '#333',
      textAlign: 'center',
    },
    entr: {
      marginTop: 100
    },
    touch1: {
      marginRight: 20
    },
    touch2: {
      marginLeft: 20
    }
  },
  //卖家中心
  shome: {
    container: {
      flex: 1,
      overflow: 'hidden'
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
      height: 14
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
      color: '#ff7d15'
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
      width: 110,
      height: 34
    },
    idTabImg: {
      width: 110,
      height: 34
    },
    userToOther: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end'
    },
    userShare: {
      width: 20,
      height: 20
    },
    userToOther: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      paddingBottom: 5
    },
    userQrcode: {
      width: 20,
      height: 20,
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
      color: '#000',
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
    }
  }
}
