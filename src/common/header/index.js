import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { actionCreators } from "./store";
import { actionCreators as LoginActionCreators } from "../../pages/login/store";
import {
  HeaderWrapper,
  Logo,
  NavItem,
  Nav,
  NavSearch,
  Addition,
  Button,
  SearchWrapper,
  SearchInfo,
  SearchInfoTitle,
  SearchInfoSwitch,
  SearchInfoList,
  SearchInfoItem,
} from "./style";

class Header extends Component {
  getListArea(show) {
    const {
      list,
      page,
      mouseIn,
      totalPage,
      handleMouseEnter,
      handleMouseLeave,
      handleChangePage,
    } = this.props;
    const newList = list.toJS();
    const pageList = [];
    if (newList.length) {
      for (let i = (page - 1) * 10; i < page * 10; i++) {
        pageList.push(
          <SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
        );
      }
    }

    if (show || mouseIn) {
      return (
        <SearchInfo
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <SearchInfoTitle>
            热门搜索
            <SearchInfoSwitch
              onClick={() => handleChangePage(page, totalPage, this.spinIcon)}
            >
              <i
                ref={(icon) => {
                  this.spinIcon = icon;
                }}
                className="iconfont spin"
              >
                &#xe851;
              </i>
              换一批
            </SearchInfoSwitch>
          </SearchInfoTitle>
          <SearchInfoList>{pageList}</SearchInfoList>
        </SearchInfo>
      );
    } else {
      return null;
    }
  }

  render() {
    const { list, login } = this.props;
    return (
      <HeaderWrapper>
        <Link to="/">
          <Logo />
        </Link>
        <Nav>
          <NavItem className="left active">首页</NavItem>
          <NavItem className="left">下载App</NavItem>
          <Link to="/login" onClick={() => this.props.handleClick(login)}>
            <NavItem className="right">{!login ? "登录" : "退出"}</NavItem>
          </Link>
          <NavItem className="right">
            <i className="iconfont">&#xe636;</i>
          </NavItem>
          <SearchWrapper>
            <CSSTransition
              in={this.props.focused}
              timeout={200}
              classNames="slide"
            >
              <NavSearch
                className={this.props.focused ? "focused" : ""}
                onFocus={() => {
                  this.props.handleInputFocus(list);
                }}
                onBlur={this.props.handleInputBlur}
                placeholder="搜索"
              ></NavSearch>
            </CSSTransition>

            <i
              className={
                this.props.focused ? "focused iconfont zoom" : "iconfont zoom"
              }
            >
              &#xe614;
            </i>
            {this.getListArea(this.props.focused)}
          </SearchWrapper>
        </Nav>
        <Addition>
          <Link to="/write">
            <Button className="writting">
              <i className="iconfont">&#xe615;</i>
              写文章
            </Button>
            <Button className="reg">注册</Button>
          </Link>
        </Addition>
      </HeaderWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // focused: state.get("header").get("focused"),
    focused: state.getIn(["header", "focused"]),
    list: state.getIn(["header", "list"]),
    page: state.getIn(["header", "page"]),
    totalPage: state.getIn(["header", "totalPage"]),
    mouseIn: state.getIn(["header", "mouseIn"]),
    login: state.getIn(["login", "login"]),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleInputFocus(list) {
      if (list.size === 0) {
        dispatch(actionCreators.getList());
      }
      dispatch(actionCreators.searchFocus());
    },
    handleInputBlur() {
      dispatch(actionCreators.searchBlur());
    },
    handleMouseEnter() {
      dispatch(actionCreators.mouseEnter());
    },
    handleMouseLeave() {
      dispatch(actionCreators.mouseLeave());
    },
    handleChangePage(page, totalPage, spin) {
      let originAngle = spin.style.transform.replace(/[^0-9]/gi, "");
      if (originAngle) {
        originAngle = parseInt(originAngle, 10);
      } else {
        originAngle = 0;
      }
      spin.style.transform = "rotate(" + (originAngle + 360) + "deg)";
      if (page < totalPage) {
        dispatch(actionCreators.changePage(page + 1));
      } else {
        dispatch(actionCreators.changePage(1));
      }
    },
    handleClick(login) {
      if (login) {
        dispatch(LoginActionCreators.logout());
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
