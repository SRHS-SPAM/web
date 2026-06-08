import { useState, useEffect } from "react";
import "./App.css";

import bg from "./assets/background.png";
import topbar from "./assets/topbar-new.png";
import schoolLogo from "./assets/school-logo.png";
import spamLogo from "./assets/spam-logo.png";
import loginBox from "./assets/login-box.png";
import emailBox from "./assets/email-box.png";
import passwordBox from "./assets/password-box.png";
import loginButton from "./assets/login-button.png";
import dividerLine from "./assets/divider-line.png";

import confirmPasswordBox from "./assets/confirm-password-box.png";
import nameBox from "./assets/name-box.png";
import birthYearBox from "./assets/birth-year-box.png";
import birthMonthBox from "./assets/birth-month-box.png";
import birthDayBox from "./assets/birth-day-box.png";
import studentGradeBox from "./assets/student-grade-box.png";
import studentClassBox from "./assets/student-class-box.png";
import studentNumberBox from "./assets/student-number-box.png";
import signupButton from "./assets/signup-button.png";
import cancelButton from "./assets/cancel-button.png";
import dropdownArrow from "./assets/dropdown-arrow.png";
import signupBox from "./assets/signup-box.png";

import dropdownBoxImg from "./assets/month_dropdown_box.png";
import dropdownLineImg from "./assets/month_dropdown_line.png";

import resendBox from "./assets/resend-box.png";
import verifyLine from "./assets/verify-line.png";
import verifySmallButton from "./assets/verify-small-button.png";
import verifyConfirmBox from "./assets/verify-confirm-box.png";
import verifyCompleteButton from "./assets/verify-complete-button.png";
import verifySuccess from "./assets/verify-success.png";

import homeBanner from "./assets/home-banner.png";
import reserveQuickBox from "./assets/reserve-quick-box.png";

import printerTitleLine from "./assets/printer-title-line.png";

import reserveBanner from "./assets/reserve-banner.png";
import reserveLine from "./assets/reserve-line.png";
import reserveArrow from "./assets/reserve-arrow.png";

import mypageArrow from "./assets/mypage-arrow.png";
import mypageSetting from "./assets/mypage-setting.png";
import profileCircle from "./assets/profile-circle.png";
import profileUser from "./assets/profile-user.png";
import profileBox from "./assets/profile-box.png";
import usingPrinterBox from "./assets/using-printer-box.png";
import usingPrinterPill from "./assets/using-printer-pill.png";
import usingPrinterDot from "./assets/using-printer-dot.png";
import historyBox from "./assets/history-box.png";
import historyLineRow from "./assets/history-line-row.png";
import historyLineCol from "./assets/history-line-col.png";

import settingRowBox from "./assets/setting-row-box.png";
import settingToggleBox from "./assets/setting-toggle-box.png";
import settingToggleCircle from "./assets/setting-toggle-circle.png";
import settingAccountArrow from "./assets/setting-account-arrow.png";
import settingHeader from "./assets/setting-header.png";

import settingToggleBlackBox from "./assets/setting-toggle-black-box.png";
import settingToggleWhiteCircle from "./assets/setting-toggle-white-circle.png";

import accountLine from "./assets/account-line.png";
import accountVerticalLine from "./assets/account-vertical-line.png";

import eyeOffIcon from "./assets/password-eye-off.png";
import eyeOnIcon from "./assets/password-eye-on.png";

import withdrawPopupBox from "./assets/withdraw-popup-box.png";
import withdrawTrashIcon from "./assets/withdraw-trash-icon.png";
import withdrawConfirmBox from "./assets/withdraw-confirm-box.png";
import withdrawCancelBox from "./assets/withdraw-cancel-box.png";

function App() {
  const [page, setPage] = useState("login");
  const [alarmOn, setAlarmOn] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [monthOpen, setMonthOpen] = useState(false);
  const [month, setMonth] = useState("");

  const [dayOpen, setDayOpen] = useState(false);
  const [day, setDay] = useState("");

  const [timeLeft, setTimeLeft] = useState(600);
  const [isVerified, setIsVerified] = useState(false);
  const [verifyCode, setVerifyCode] = useState("");

  const [showOldPw, setShowOldPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showCheckPw, setShowCheckPw] = useState(false);
  const [showWithdrawPopup, setShowWithdrawPopup] = useState(false);
  const [joinDate, setJoinDate] = useState(
  localStorage.getItem("joinDate") || ""
  );  

  const [currentPrinter, setCurrentPrinter] = useState(null);
  const [history, setHistory] = useState([]);

  const [studentName, setStudentName] = useState(""); 
  const [studentGrade, setStudentGrade] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [studentNumber, setStudentNumber] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const months = [
    "1월", "2월", "3월", "4월", "5월", "6월",
    "7월", "8월", "9월", "10월", "11월", "12월",
  ];

  const days = Array.from({ length: 31 }, (_, i) => `${i + 1}일`);

  const [printers, setPrinters] = useState([
    "available",
    "available",
    "available",
    "available",
  ]);

  useEffect(() => {
    if (page !== "verifyCode") return;

    setTimeLeft(600);
    setIsVerified(false);
    setVerifyCode("");

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [page]);

  const handleVerifyCode = () => {
  if (verifyCode.trim() === "") {
    alert("인증코드를 입력해주세요.");
    return;
  }

  alert("이메일 인증은 백엔드 연결 후 사용 가능합니다.");
};

  const getPrinterText = (status) => {
    if (status === "available") return "예약가능";
    if (status === "using") return "사용중...";
    if (status === "reserved") return "예약됨";
    if (status === "unavailable") return "예약불가";
  };

  const getReserveText = (status) => {
    if (status === "available") return "예약가능";
    if (status === "using") return "사용중...";
    if (status === "reserved") return "예약됨";
    if (status === "unavailable") return "예약불가";
  };

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <div className="app">
      {page !== "home" &&
        page !== "reserve" &&
        page !== "mypage" &&
        page !== "setting" &&
        page !== "account" &&
        page !== "changePassword" && 
        page !== "changeEmail" && (
          <img src={bg} className="bg" alt="" />
      )}

      <div className="nav">
        <img src={topbar} className="topbar" alt="" />

        <div
          className="nav-text nav-home"
          onClick={() => {
            if (isLoggedIn) setPage("home");
          }}
        >
          홈
        </div>

        <div
          className="nav-text nav-reserve"
          onClick={() => {
            if (isLoggedIn) setPage("reserve");
          }}
        >
          예약
        </div>

        <div
          className="nav-text nav-mypage"
          onClick={() => {
            if (isLoggedIn) setPage("mypage");
          }}
        >
          마이페이지
        </div>

        <img src={schoolLogo} className="school-logo" alt="" />
        <img src={spamLogo} className="spam-logo" alt="" />

        <div
          className="nav-text nav-login"
          onClick={() => {
            if (isLoggedIn) {
              setIsLoggedIn(false);
              setPrinters(["available", "available", "available", "available"]);
              setPage("login");
            } else {
              setPage("login");
            }
          }}
        >
          {isLoggedIn ? "로그아웃" : "로그인"}
        </div>
      </div>

      {page === "login" && (
        <div className="login-area">
          <img src={signupBox} className="signup-box-img" alt="" />

          <h1 className="login-title">로그인</h1>

          <p className="email-label">이메일</p>
          <img src={emailBox} className="email-box-img" alt="" />
          <input
            className="email-input"
            placeholder="이메일 입력"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />

          <p className="password-label">비밀번호</p>
          <img src={passwordBox} className="password-box-img" alt="" />
          <input
            className="password-input"
            placeholder="비밀번호 입력"
            type="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />

          <img src={loginButton} className="login-button-img" alt="" />
          <button
            className="login-button"
            onClick={() => {
              if (loginEmail.trim() === "" || loginPassword.trim() === "") {
                alert("이메일과 비밀번호를 입력해주세요.");
                return;
              }

              setIsLoggedIn(true);
              setUserEmail(loginEmail);
              setPage("home");
            }}
          >
            로그인
          </button>

          <label className="auto-login">
            <input type="checkbox" />
            <span>자동 로그인</span>
          </label>

          <img src={dividerLine} className="divider-line" alt="" />

          <div className="login-links">
            <span className="signup-link" onClick={() => setPage("signup")}>
              회원 가입
            </span>

            <span
              className="findpw-link"
              onClick={() => setPage("findPassword")}
            >
              비밀번호 찾기
            </span>
          </div>
        </div>
      )}

      {page === "home" && (
        <div className="home-area">
          <div className="home-banner">
            <img src={homeBanner} className="home-banner-img" alt="" />
            <div className="home-banner-title">
              우리 학교 3D 프린터를<br />
              한 곳에서.
            </div>
          </div>

          <div className="home-title-row">
            <span>프린터 상태 확인</span>

            <div
              className="reserve-quick-wrap"
              onClick={() => setPage("reserve")}
            >
              <img
                src={reserveQuickBox}
                className="reserve-quick-box-img"
                alt=""
              />
              <span className="reserve-quick-text">예약 바로 가기</span>
              <span className="reserve-quick-arrow">〉</span>
            </div>
          </div>

          <div className="printer-panel">
            <div className="printer-panel-title">
              2층 소프트웨어 3D 프린터
              <img
                src={printerTitleLine}
                className="printer-title-line-img"
                alt=""
              />
            </div>

            <div className="printer-grid">
              {printers.map((status, index) => (
                <div className="printer-item" key={index}>
                  <div className={`printer-card ${status}`}>
                    {getPrinterText(status)}
                  </div>

                  <button
                    className={`printer-btn ${
                      status === "available" ? "active" : "disabled"
                    }`}
                    disabled={status !== "available"}
                  >
                    {status === "available" ? "예약하기" : "예약불가"}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <footer className="home-footer">
            <p>서울로봇고등학교 3D 프린터 관리 시스템</p>
            <p>SPAM동아리에서 제작</p>
            <div>
              <span>Frontend : React / Flutter</span>
              <span>Backend : DRF</span>
              <span>Design : Figma</span>
            </div>
          </footer>
        </div>
      )}

      {page === "reserve" && (
        <div className="reserve-area">
          <div className="reserve-banner">
            <img src={reserveBanner} className="reserve-banner-img" alt="" />
            <div className="reserve-banner-title">
              모든 예약은<br />
              이곳에서 확인하세요.
            </div>
          </div>

          <img src={reserveLine} className="reserve-line-img" alt="" />

          <div className="reserve-title-row">
            <span>예약</span>
            <img src={reserveArrow} className="reserve-title-arrow" alt="" />
          </div>

          <div className="reserve-printer-panel">
            <div className="printer-panel-title">
              2층 소프트웨어 3D 프린터
              <img
                src={printerTitleLine}
                className="printer-title-line-img"
                alt=""
              />
            </div>

            <div className="printer-grid">
              {printers.map((status, index) => (
                <div className="printer-item" key={index}>
                  <div className={`printer-card ${status}`}>
                    {getReserveText(status)}
                  </div>

                  <button
                    className={`printer-btn ${
                      status === "available" ? "active" : "disabled"
                    }`}
                    disabled={status !== "available"}
                    onClick={() => {
                      const updated = [...printers];
                      updated[index] = "reserved";
                      setPrinters(updated);
                      alert("예약되었습니다.");
                    }}
                  >
                    {status === "available" ? "예약하기" : "예약불가"}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <footer className="home-footer">
            <p>서울로봇고등학교 3D 프린터 관리 시스템</p>
            <p>SPAM동아리에서 제작</p>
            <div>
              <span>Frontend : React / Flutter</span>
              <span>Backend : DRF</span>
              <span>Design : Figma</span>
            </div>
          </footer>
        </div>
      )}

      {page === "mypage" && (
        <div className="mypage-area">
          <div className="mypage-title-row">
            <span>마이페이지</span>
            <img src={mypageArrow} className="mypage-title-arrow" alt="" />
            <img
              src={mypageSetting}
              className="mypage-setting"
              alt=""
              onClick={() => setPage("setting")}
            />
          </div>

          <div className="profile-area">
            <img src={profileBox} className="profile-box-img" alt="" />
            <img src={profileCircle} className="profile-circle-img" alt="" />
            <img src={profileUser} className="profile-user-img" alt="" />

            <div className="profile-info">
              <p>{studentName}</p>
              <p>
                {studentGrade}학년 {studentClass}반 {studentNumber}번
              </p>
            </div>
          </div>

          <div className="using-printer-area">
            <img src={usingPrinterBox} className="using-printer-box-img" alt="" />

            <h2 className="using-printer-title">사용중인 프린터</h2>

            {currentPrinter === null ? (
              <div className="no-current-printer">
                사용중인 프린터가 없습니다.
              </div>
            ) : (
              <>
                <div className="using-printer-name">
                  {currentPrinter}번 프린터
                </div>

                {currentPrinter === null ? (
                  <div className="no-current-printer">
                    사용중인 프린터가 없습니다.
                  </div>
                ) : (
                  <>
                    <div className="using-printer-name">
                      n번 프린터
                    </div>

                    <div className="using-printer-card available">
                      사용가능
                    </div>

                    <div className="using-printer-pill-wrap">
                      ...
                    </div>
                  </>
                )}
              </>
            )}
          </div>

          <div className="history-area">
            <img src={historyBox} className="history-box-img" alt="" />

            <h2 className="history-title">내 기록 보기</h2>
            <img src={historyLineRow} className="history-line-row" alt="" />
            <img src={historyLineCol} className="history-line-col col1" alt="" />
            <img src={historyLineCol} className="history-line-col col2" alt="" />

            <div className="history-head h-printer">프린터 번호</div>
            <div className="history-head h-date">일시</div>
            <div className="history-head h-end">종료 시각</div>

            <div className="history-text h-printer-data">
              {history.length === 0 ? (
                <div>-</div>
              ) : (
                history.map((item, index) => (
                  <div key={index}>{item.printer}</div>
                ))
              )}
            </div>

            <div className="history-text h-date-data">
              {history.length === 0 ? (
                <div>-</div>
              ) : (
                history.map((item, index) => (
                <div key={index}>{item.start}</div>
              ))
            )}
          </div>

          <div className="history-text h-end-data">
            {history.length === 0 ? (
             <div>-</div>
            ) : (
              history.map((item, index) => (
                <div key={index}>{item.end}</div>
              ))
            )}
          </div>
          </div>

          <footer className="home-footer">
            <p>서울로봇고등학교 3D 프린터 관리 시스템</p>
            <p>SPAM동아리에서 제작</p>
            <div>
              <span>Frontend : React / Flutter</span>
              <span>Backend : DRF</span>
              <span>Design : Figma</span>
            </div>
          </footer>
        </div>
      )}

      {page === "setting" && (
        <div className="setting-area">
          <img src={settingHeader} className="setting-header-img" alt="" />

          <div className="setting-title">
            <img src={mypageSetting} className="setting-title-icon" alt="" />
            <span>설정</span>
          </div>

          <p className="setting-small-title alarm-title">알림 허용</p>

          <div className="setting-row alarm-row">
            <img src={settingRowBox} className="setting-row-box" alt="" />
            <span className="setting-row-text">알림</span>

            <div
              className="setting-toggle-wrap"
              onClick={() => setAlarmOn(!alarmOn)}
            >
              <img
                src={alarmOn ? settingToggleBlackBox : settingToggleBox}
                className="setting-toggle-box"
                alt=""
              />

              <img
                src={alarmOn ? settingToggleWhiteCircle : settingToggleCircle}
                className={`setting-toggle-circle ${alarmOn ? "on" : "off"}`}
                alt=""
              />
            </div>
          </div>

          <p className="setting-small-title account-title">계정 설정</p>

          <div className="setting-row account-row">
            <img src={settingRowBox} className="setting-row-box" alt="" />
            <span className="setting-row-text">계정</span>

            <img
              src={settingAccountArrow}
              className="setting-account-arrow"
              alt=""
              onClick={() => setPage("account")}
            />
          </div>
        </div>
      )}

      {page === "account" && (
        <div className="account-area">
          <div className="account-header">
            계정
          </div>

          <p className="account-section-title login-info-title">로그인 정보</p>

          <div className="account-row account-email-row">
            <span>이메일 변경/확인</span>
            <img
              src={settingAccountArrow}
              className="account-arrow"
              alt=""
              onClick={() => setPage("changeEmail")}
            />
          </div>

          <img src={accountLine} className="account-line email-line" alt="" />

          <div className="account-row account-password-row">
            <span>비밀번호 변경</span>
            <img
              src={settingAccountArrow}
              className="account-arrow"
              alt=""
              onClick={() => setPage("changePassword")}
            />
          </div>

          <p className="account-section-title account-info-title">계정 정보</p>

          <div className="account-info-row join-date-row">
            <span className="account-info-label">가입일</span>
            <img src={accountVerticalLine} className="account-vertical-line" alt="" />
            <span className="account-date">
              {joinDate || "가입일 없음"}
            </span>
          </div>

          <img src={accountLine} className="account-line join-line" alt="" />

          <div className="account-info-row join-method-row">
            <span className="account-info-label">가입 방법</span>
            <img src={accountVerticalLine} className="account-vertical-line" alt="" />
            <span className="account-method">이메일</span>
          </div>

          <p className="account-section-title logout-title">로그아웃/회원탈퇴</p>

          <div className="account-row logout-row">
            <span>로그아웃</span>
            <img
              src={settingAccountArrow}
              className="account-arrow"
              alt=""
              onClick={() => {
                setIsLoggedIn(false);
                setPrinters(["available", "using", "unavailable", "reserved"]);
                setPage("login");
              }}
            />
          </div>

          <img src={accountLine} className="account-line logout-line" alt="" />

          <div className="account-row withdraw-row">
            <span>회원탈퇴</span>
            <img
              src={settingAccountArrow}
              className="account-arrow"
              alt=""
              onClick={() => setShowWithdrawPopup(true)}
            />
          </div>

          {showWithdrawPopup && (
            <>
              <div className="withdraw-blur" />

              <div className="withdraw-popup">
                <img src={withdrawPopupBox} className="withdraw-popup-box" alt="" />
                <img src={withdrawTrashIcon} className="withdraw-trash-icon" alt="" />

                <div className="withdraw-title">
                  정말 회원 탈퇴 하시겠습니까?
                </div>

                <div className="withdraw-message">
                  탈퇴시, 계정은 삭제되며
                  <br />
                  복구되지 않습니다.
                </div>

                <img src={withdrawConfirmBox} className="withdraw-confirm-box" alt="" />
                <button
                  className="withdraw-confirm-btn"
                  onClick={() => {
                    setShowWithdrawPopup(false);
                    setIsLoggedIn(false);
                    setPage("login");
                  }}
                >
                  확인
                </button>

                <img src={withdrawCancelBox} className="withdraw-cancel-box" alt="" />
                <button
                  className="withdraw-cancel-btn"
                  onClick={() => setShowWithdrawPopup(false)}
                >
                  취소
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {page === "changeEmail" && (
        <div className="change-email-area">
          <div className="change-email-header">
            로그인 정보
          </div>

          <p className="change-email-small-title">
            이메일 변경/확인
          </p>

          <div className="change-email-row change-email-row1">
            <span className="change-email-label">기존 이메일</span>
            <img src={accountVerticalLine} className="change-email-vline" alt="" />
            <span className="change-email-value">
              {userEmail || "이메일 없음"}
            </span>
          </div>

          <img src={accountLine} className="change-email-line line1" alt="" />

          <div className="change-email-row change-email-row2">
            <span className="change-email-label">새 이메일</span>
            <img src={accountVerticalLine} className="change-email-vline" alt="" />
            <input
              className="change-email-input"
              placeholder="새 이메일 입력"
            />
          </div>
        </div>
      )}
      
      {page === "changePassword" && (
        <div className="change-password-area">
          <div className="change-password-header">
            로그인 정보
          </div>

          <p className="change-password-small-title">
            로그인 정보
          </p>

          <div className="change-password-row change-password-row1">
            <span className="change-password-label">기존 비밀번호</span>
            <img src={accountVerticalLine} className="change-password-vline" alt="" />
            <input
              className="change-password-input"
              type={showOldPw ? "text" : "password"}
              placeholder="비밀번호 입력"
            />
            <img
              src={showOldPw ? eyeOnIcon : eyeOffIcon}
              className="change-password-eye"
              alt=""
              onClick={() => setShowOldPw(!showOldPw)}
            />
          </div>

          <img src={accountLine} className="change-password-line line1" alt="" />

          <div className="change-password-row change-password-row2">
            <span className="change-password-label">새 비밀번호</span>
            <img src={accountVerticalLine} className="change-password-vline" alt="" />
            <input
              className="change-password-input"
              type={showNewPw ? "text" : "password"}
              placeholder="새 비밀번호 입력"
            />
            <img
              src={showNewPw ? eyeOnIcon : eyeOffIcon}
              className="change-password-eye"
              alt=""
              onClick={() => setShowNewPw(!showNewPw)}
            />
          </div>

          <img src={accountLine} className="change-password-line line2" alt="" />

          <div className="change-password-row change-password-row3">
            <span className="change-password-label">비밀번호 확인</span>
            <img src={accountVerticalLine} className="change-password-vline" alt="" />
            <input
              className="change-password-input"
              type={showCheckPw ? "text" : "password"}
              placeholder="비밀번호 확인"
            />
            <img
              src={showCheckPw ? eyeOnIcon : eyeOffIcon}
              className="change-password-eye"
              alt=""
              onClick={() => setShowCheckPw(!showCheckPw)}
            />
          </div>
        </div>
      )}

      {page === "findPassword" && (
        <div className="findpw-area">
          <img src={signupBox} className="findpw-box-img" alt="" />
          <h1 className="findpw-title">비밀번호 찾기</h1>
          <p className="findpw-label findpw-email-label">이메일</p>
          <img src={emailBox} className="findpw-input-box findpw-email-box" alt="" />
          <input className="findpw-input findpw-email-input" placeholder="이메일 입력" />
          <p className="findpw-label findpw-name-label">이름</p>
          <img src={nameBox} className="findpw-input-box findpw-name-box" alt="" />
          <input className="findpw-input findpw-name-input" placeholder="이름 입력" />
          <img src={loginButton} className="findpw-button-img" alt="" />
          <button className="findpw-button" onClick={() => setPage("verifyCode")}>
            확인
          </button>
        </div>
      )}

      {page === "verifyCode" && (
        <div className="verify-area">
          <img src={signupBox} className="verify-box-img" alt="" />
          <h1 className="verify-title">비밀번호 찾기</h1>

          <img src={resendBox} className="resend-box-img" alt="" />
          <button
            className="resend-button"
            onClick={() => {
              setTimeLeft(600);
              setIsVerified(false);
              setVerifyCode("");
              alert("인증코드를 재발송했습니다.");
            }}
          >
            재발송
          </button>

          <p className="verify-email-label">이메일 인증</p>

          <input
            className="verify-code-input"
            placeholder="인증코드 입력"
            value={verifyCode}
            onChange={(e) => {
              setVerifyCode(e.target.value);
              setIsVerified(false);
            }}
          />

          <span className="verify-timer">
            {minutes}:{seconds}
          </span>

          {isVerified ? (
            <img src={verifySuccess} className="verify-check-icon" alt="" />
          ) : (
            <>
              <img src={verifySmallButton} className="verify-small-button-img" alt="" />
              <button className="verify-small-button" onClick={handleVerifyCode}>
                확인
              </button>
            </>
          )}

          <img src={verifyLine} className="verify-line-img" alt="" />

          <img
            src={isVerified ? verifyCompleteButton : verifyConfirmBox}
            className="verify-main-button-img"
            alt=""
          />
          <button
            className="verify-main-button"
            onClick={() => {
              if (isVerified) {
                setPage("resetPassword");
              } else {
                alert("인증을 먼저 완료해주세요.");
              }
            }}
          >
            확인
          </button>
        </div>
      )}

      {page === "resetPassword" && (
        <div className="findpw-area">
          <img src={signupBox} className="findpw-box-img" alt="" />
          <h1 className="findpw-title">비밀번호 변경</h1>

          <p className="findpw-label findpw-email-label">새 비밀번호 입력</p>
          <img src={passwordBox} className="findpw-input-box findpw-email-box" alt="" />
          <input
            className="findpw-input findpw-email-input"
            placeholder="새 비밀번호 입력"
            type="password"
          />

          <p className="findpw-label findpw-name-label">비밀번호 확인</p>
          <img
            src={confirmPasswordBox}
            className="findpw-input-box findpw-name-box"
            alt=""
          />
          <input
            className="findpw-input findpw-name-input"
            placeholder="비밀번호 입력"
            type="password"
          />

          <img src={loginButton} className="findpw-button-img" alt="" />
          <button className="findpw-button" onClick={() => setPage("login")}>
            변경하기
          </button>
        </div>
      )}

      {page === "signup" && (
        <div className="signup-area">
          <img src={loginBox} className="signup-box-img" alt="" />
          <h1 className="signup-title">회원가입</h1>

          <p className="signup-label signup-email-label">이메일</p>
          <img src={emailBox} className="signup-long-box signup-email-box" alt="" />
          <input className="signup-input signup-email-input" placeholder="이메일 입력" />

          <p className="signup-label signup-password-label">비밀번호</p>
          <img src={passwordBox} className="signup-long-box signup-password-box" alt="" />
          <input
            className="signup-input signup-password-input"
            placeholder="비밀번호 입력"
            type="password"
          />

          <p className="signup-help signup-password-help">
            *10자 이상이며 영문, 숫자, 특수문자를 모두 포함하세요
          </p>

          <p className="signup-label signup-confirm-label">비밀번호 확인</p>
          <img
            src={confirmPasswordBox}
            className="signup-long-box signup-confirm-box"
            alt=""
          />
          <input
            className="signup-input signup-confirm-input"
            placeholder="비밀번호 입력"
            type="password"
          />

          <p className="signup-help signup-confirm-help">
            * 비밀번호를 다시 입력해주세요
          </p>

          <p className="signup-label signup-name-label">이름</p>
          <img src={nameBox} className="signup-long-box signup-name-box" alt="" />
          <input className="signup-input signup-name-input" placeholder="이름 입력" />

          <p className="signup-label signup-birth-label">생년월일</p>

          <img src={birthYearBox} className="signup-small-box birth-year-box" alt="" />
          <img src={birthMonthBox} className="signup-small-box birth-month-box" alt="" />
          <img src={birthDayBox} className="signup-small-box birth-day-box" alt="" />

          <input className="small-input birth-year-input" placeholder="년도" />

          <button
            type="button"
            className="small-input birth-month-input month-custom-button"
            onClick={() => {
              setMonthOpen((prev) => !prev);
              setDayOpen(false);
            }}
          >
            <span>{month || "월"}</span>
          </button>

          <button
            type="button"
            className="small-input birth-day-input day-custom-button"
            onClick={() => {
              setDayOpen((prev) => !prev);
              setMonthOpen(false);
            }}
          >
            <span>{day || "일"}</span>
          </button>

          <img src={dropdownArrow} className="dropdown-arrow month-arrow" alt="" />
          <img src={dropdownArrow} className="dropdown-arrow day-arrow" alt="" />

          {monthOpen && (
            <div className="month-dropdown-menu">
              <img src={dropdownBoxImg} className="month-dropdown-box-img" alt="" />
              <div className="month-dropdown-content">
                <div className="month-dropdown-top">
                  <span>월</span>
                  <img
                    src={dropdownArrow}
                    className="month-dropdown-arrow"
                    alt=""
                    onClick={() => setMonthOpen(false)}
                  />
                </div>
                <img src={dropdownLineImg} className="month-dropdown-line" alt="" />
                <div className="month-option-list">
                  {months.map((item) => (
                    <button
                      type="button"
                      key={item}
                      className="month-option"
                      onClick={() => {
                        setMonth(item);
                        setMonthOpen(false);
                      }}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {dayOpen && (
            <div className="day-dropdown-menu">
              <img src={dropdownBoxImg} className="day-dropdown-box-img" alt="" />
              <div className="day-dropdown-content">
                <div className="day-dropdown-top">
                  <span>일</span>
                  <img
                    src={dropdownArrow}
                    className="day-dropdown-arrow"
                    alt=""
                    onClick={() => setDayOpen(false)}
                  />
                </div>
                <img src={dropdownLineImg} className="day-dropdown-line" alt="" />
                <div className="day-option-list">
                  {days.map((item) => (
                    <button
                      type="button"
                      key={item}
                      className="day-option"
                      onClick={() => {
                        setDay(item);
                        setDayOpen(false);
                      }}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <p className="signup-label signup-student-label">학번</p>

          <img
            src={studentGradeBox}
            className="signup-small-box student-grade-box"
            alt=""
          />
          <img
            src={studentClassBox}
            className="signup-small-box student-class-box"
            alt=""
          />
          <img
            src={studentNumberBox}
            className="signup-small-box student-number-box"
            alt=""
          />

          <input className="small-input student-grade-input" placeholder="학년" />
          <input className="small-input student-class-input" placeholder="반" />
          <input className="small-input student-number-input" placeholder="번호" />

          <img src={signupButton} className="signup-button-img" alt="" />
          <button
            className="signup-submit"
            onClick={() => {
              const today = new Date();
              const newJoinDate = `${today.getFullYear()}년 ${
              today.getMonth() + 1
            }월 ${today.getDate()}일`;

              setJoinDate(newJoinDate);
              localStorage.setItem("joinDate", newJoinDate);

              setPage("login");
            }}
          >
            가입하기
          </button>

          <img src={cancelButton} className="cancel-button-img" alt="" />
          <button className="signup-cancel" onClick={() => setPage("login")}>
            가입취소
          </button>
        </div>
      )}
    </div>
  );
}

export default App;