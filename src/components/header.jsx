import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PointModal } from './modals/point-modal';
import coin from '../assets/icons/coin.png';
import { removeCookie } from '../utils/cookie';
import { signOut } from '../apis/api';
import { useSelector, useDispatch } from 'react-redux';
import { setLoginState, setUserProfile } from '../redux/user-slice';
import { ProfileImage } from '../components/profile-image';

export const Header = () => {
  const [isLogin, setIsLogin] = useState(true);
  const location = useLocation();

  const [showProfile, setShowProfile] = useState(false);
  const [isPointModalOpen, setIsPointModalOpen] = useState(false);

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

  return (
    <div className="w-full flex flex-row items-center justify-between bg-white drop-shadow h-[80px] px-4 md:px-[68px] z-[999]">
      {/* 로고 */}
      <Link
        to="/"
        className="text-[26px] font-extrabold text-[#14142B] leading-9 tracking-tighter sm:text-[20px] sm:leading-none"
      >
        멋쟁이 사주처럼
      </Link>
      {/* 네비게이션 */}
      <div className="flex flex-row items-center gap-[50px] sm:gap-4">
        <Link
          to="/saju"
          className={`text-xl font-bold leading-6 sm:text-sm sm:leading-none ${
            location.pathname === '/saju'
              ? 'text-[#4A3AFF] font-extrabold'
              : 'text-[#14142B] hover:text-[#4A3AFF]'
          }`}
        >
          사주
        </Link>
        <Link
          to="/chat"
          className={`text-xl font-bold leading-6 sm:text-sm sm:leading-none ${
            location.pathname === '/chat'
              ? 'text-[#4A3AFF] font-extrabold'
              : 'text-[#14142B] hover:text-[#4A3AFF]'
          }`}
        >
          채팅
        </Link>
        {isLogin ? (
          <div
            className="relative"
            onMouseOver={() => setShowProfile(true)}
            onMouseLeave={() => setShowProfile(false)}
          >
            <span className="text-xl font-bold leading-6 text-[#14142B] hover:text-[#4A3AFF] sm:text-sm sm:leading-none">
              프로필
            </span>
            {showProfile && (
              <div className="absolute top-[25px] right-0 bg-white drop-shadow w-[180px] md:w-[221px] p-4 md:p-[25px] rounded-[12px] flex flex-col gap-4 md:gap-5">
                {profileImgIndex && (
                  <div className="flex flex-row gap-[10px] items-center">
                    <ProfileImage
                      profileImageId={profileImgIndex}
                      additionalClassName={'w-[30px] h-[30px]'}
                    />
                    <span className="text-sm md:text-lg font-bold text-[#170F49]">
                      {nickname}
                    </span>
                  </div>
                )}
                <div className="flex flex-row items-center justify-between">
                  <div className="flex flex-row gap-[10px] items-center">
                    <img
                      src={coin}
                      alt="coin"
                      className="w-[20px] md:w-[30px]"
                    />
                    <span className="text-sm md:text-lg font-bold text-[#170F49]">
                      포인트
                    </span>
                  </div>
                  <span className="text-sm md:text-lg font-bold text-[#4A3AFF]">
                    {point}
                    <span className="text-[#160F49]">P</span>
                  </span>
                </div>
                <button
                  onClick={onClickPoint}
                  className="bg-[#160F49] text-white text-sm md:text-base font-semibold rounded-[50px] px-4 md:px-6 py-[6px]"
                >
                  충전하기
                </button>
                <span
                  onClick={onClickLogout}
                  className="text-sm md:text-base font-normal underline text-[#160F49] cursor-pointer"
                >
                  로그아웃
                </span>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="text-xl font-bold text-[#4A3AFF] bg-[#F3F1FF] px-7 py-[17px] rounded-[50px] sm:text-sm sm:leading-none sm:px-5 sm:py-[10px]"
          >
            로그인
          </Link>
        )}
      </div>
      {isPointModalOpen && <PointModal setIsModalOpen={setIsPointModalOpen} />}
    </div>
  );
};
