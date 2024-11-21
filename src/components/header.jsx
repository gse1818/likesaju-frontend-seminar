import React, { useEffect, useState } from 'react'; // React의 기본 기능 및 상태 관리
import { Link, useLocation } from 'react-router-dom'; // React Router에서 라우팅 관련 기능
import { useSelector, useDispatch } from 'react-redux'; // Redux 상태 및 디스패치 사용
import { PointModal } from './modals/point-modal'; // PointModal 컴포넌트
import coin from '../assets/icons/coin.png'; // 코인 아이콘 이미지
import { removeCookie } from '../utils/cookie'; // 쿠키 제거 유틸리티 함수
import { signOut } from '../apis/api'; // 로그아웃 API 호출 함수
import { setLoginState, setUserProfile } from '../redux/user-slice'; // Redux 액션
import { ProfileImage } from '../components/profile-image'; // 사용자 프로필 이미지 컴포넌트

export const Header = () => {
  const [isLogin, setIsLogin] = useState(true);
  const location = useLocation();

  const [showProfile, setShowProfile] = useState(false);
  const [isPointModalOpen, setIsPointModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 메뉴 상태 추가

  const nickname = useSelector((state) => state.user.nickname);
  const point = useSelector((state) => state.user.remaining_points);
  const profileImgIndex = useSelector((state) => state.user.profilepic_id);
  const loggedIn = useSelector((state) => state.user.isLogin);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLogin(loggedIn);
  }, []);

  const linkStyle =
    'text-xl font-bold text-[#14142B] leading-6 hover:font-extrabold hover:text-[#4A3AFF] hover:cursor-pointer';
  const activeLinkStyle = 'text-xl font-extrabold text-[#4A3AFF] leading-6';

  const onClickPoint = () => {
    setIsPointModalOpen(true);
  };

  const onClickLogout = async () => {
    const res = await signOut();
    if (res !== null) {
      removeCookie('access_token');
      removeCookie('refresh_token');
      dispatch(setLoginState(false));
      dispatch(
        setUserProfile({
          user: null,
          nickname: null,
          profilepic_id: null,
          remaining_points: null,
        }),
      );
      window.location.href = '/';
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="sticky top-0 w-full flex flex-row items-center justify-between mobile:justify-center bg-white drop-shadow h-[80px] px-[54px] mobile:px-[24px] z-[1001]">
      {/* 모바일 로고 및 메뉴 */}
      <div className="w-full flex flex-row justify-between items-center h-full z-[2000]">
        <Link
          to="/"
          className="text-[26px] mobile:text-[20px] font-extrabold text-[#14142B] leading-9 tracking-tighter"
        >
          멋쟁이 사주처럼
        </Link>

        <div className="mobile:flex hidden" onClick={toggleMenu}>
          <div className="text-lg font-bold cursor-pointer">메뉴</div>
        </div>

        {/* 데스크톱 메뉴 */}
        <div className="flex flex-row items-center gap-[50px] mobile:hidden">
          <Link
            to="/saju"
            className={
              location.pathname === '/saju' ? activeLinkStyle : linkStyle
            }
          >
            사주
          </Link>
          <Link
            to="/chat"
            className={
              location.pathname === '/chat' ? activeLinkStyle : linkStyle
            }
          >
            채팅
          </Link>
          {isLogin ? (
            <div
              className="relative"
              onMouseOver={() => setShowProfile(true)}
              onMouseLeave={() => setShowProfile(false)}
            >
              <span className="text-xl font-bold text-[#14142B] leading-6 hover:font-extrabold hover:text-[#4A3AFF] hover:cursor-pointer">
                프로필
              </span>
              {showProfile && (
                <div className="absolute top-[25px] right-[-25px] bg-white drop-shadow w-[221px] p-[25px] rounded-[12px] flex flex-col gap-5">
                  {profileImgIndex && (
                    <div className="flex flex-row gap-[10px] items-center justify-start">
                      <ProfileImage
                        profileImageId={profileImgIndex}
                        additionalClassName={'w-[30px] h-[30px]'}
                      />
                      <span className="text-lg font-bold text-[#170F49] leading-6">
                        {nickname}
                      </span>
                    </div>
                  )}
                  <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row gap-[10px] items-center">
                      <img
                        src={coin}
                        alt="coin"
                        className="w-[30px] h-[30px]"
                      />
                      <span className="text-lg font-bold text-[#170F49] leading-6">
                        포인트
                      </span>
                    </div>
                    <span className="text-lg font-bold text-[#4A3AFF] leading-6">
                      {point}
                      <span className="text-[#160F49]">P</span>
                    </span>
                  </div>
                  <button
                    onClick={onClickPoint}
                    className="bg-[#160F49] text-white text-bases font-semibold leading-6 rounded-[50px] px-6 py-[6px]"
                  >
                    충전하기
                  </button>
                  <span
                    onClick={onClickLogout}
                    className="text-base font-normal underline text-[#160F49] self-start cursor-pointer"
                  >
                    로그아웃
                  </span>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="login"
              className="text-xl font-bold text-[#4A3AFF] leading-6 bg-[#F3F1FF] px-7 py-[17px] rounded-[50px]"
            >
              로그인
            </Link>
          )}
        </div>
        <div
          className={`absolute top-[80px] left-0 w-full bg-white transition-all duration-300 overflow-hidden border-t-2 ${
            isMenuOpen ? 'max-h-[300px]' : 'max-h-0'
          }`}
          onMouseLeave={() => setIsMenuOpen(false)} // hover 벗어나면 메뉴 닫기
        >
          <div className="hidden mobile:flex mobile:flex-col items-center gap-[50px] mobile:gap-[10px] px-4 py-2">
            <Link
              to="/saju"
              className={
                location.pathname === '/saju' ? activeLinkStyle : linkStyle
              }
            >
              사주
            </Link>
            <Link
              to="/chat"
              className={`${location.pathname === '/chat' ? activeLinkStyle : linkStyle}`}
            >
              채팅
            </Link>
            {isLogin ? (
              <>
                <span
                  className="text-xl font-bold text-[#14142B] leading-6 hover:font-extrabold hover:text-[#4A3AFF] cursor-pointer"
                  onClick={onClickLogout}
                >
                  로그아웃
                </span>
              </>
            ) : (
              <Link
                to="login"
                className="text-xl font-bold text-[#4A3AFF] leading-6 bg-[#F3F1FF] px-5 py-2 rounded-[50px]"
              >
                로그인
              </Link>
            )}
          </div>
        </div>
      </div>
      {/* 데스크톱 메뉴 */}
      {isPointModalOpen && <PointModal setIsModalOpen={setIsPointModalOpen} />}
    </div>
  );
};
