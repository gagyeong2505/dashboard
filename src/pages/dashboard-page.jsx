import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import ComputerRoundedIcon from '@mui/icons-material/ComputerRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import PsychologyRoundedIcon from '@mui/icons-material/PsychologyRounded';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';
import BrushRoundedIcon from '@mui/icons-material/BrushRounded';

import FilterBar from '../components/dashboard/filter-bar';
import CourseCard from '../components/dashboard/course-card';

const COURSES = [
  {
    id: 1,
    title: 'Operating System',
    description: '운영체제의 핵심 개념인 프로세스 관리, 메모리 관리, 파일 시스템 등을 체계적으로 학습합니다.',
    instructor: 'Dr. Kim Minjae',
    iconBg: '#FFE0D6',
    icon: <ComputerRoundedIcon sx={{ fontSize: 40, color: '#E63012' }} />,
  },
  {
    id: 2,
    title: 'Web Development',
    description: 'HTML, CSS, JavaScript부터 React와 Node.js까지 풀스택 웹 개발의 모든 것을 다룹니다.',
    instructor: 'Prof. Lee Seoyeon',
    iconBg: '#D6EAFF',
    icon: <CodeRoundedIcon sx={{ fontSize: 40, color: '#1565C0' }} />,
  },
  {
    id: 3,
    title: 'Database Management',
    description: 'SQL과 NoSQL 데이터베이스 설계부터 쿼리 최적화, 트랜잭션 처리까지 실무 중심으로 학습합니다.',
    instructor: 'Dr. Park Junho',
    iconBg: '#E8F5E9',
    icon: <StorageRoundedIcon sx={{ fontSize: 40, color: '#2E7D32' }} />,
  },
  {
    id: 4,
    title: 'Machine Learning',
    description: '머신러닝 알고리즘의 수학적 원리부터 파이썬 구현, 실전 프로젝트 적용까지 깊이 있게 탐구합니다.',
    instructor: 'Prof. Choi Jina',
    iconBg: '#EDE7F6',
    icon: <PsychologyRoundedIcon sx={{ fontSize: 40, color: '#6A1B9A' }} />,
  },
  {
    id: 5,
    title: 'Network Security',
    description: '네트워크 보안 위협 분석과 암호화 기술, 방화벽 설계 등 실무 보안 역량을 집중 강화합니다.',
    instructor: 'Dr. Han Seongjae',
    iconBg: '#FFF3E0',
    icon: <SecurityRoundedIcon sx={{ fontSize: 40, color: '#E65100' }} />,
  },
  {
    id: 6,
    title: 'UI/UX Design',
    description: '사용자 중심 디자인 원칙, 프로토타이핑, 사용성 테스트를 통해 훌륭한 디지털 경험을 설계합니다.',
    instructor: 'Prof. Yoon Daehee',
    iconBg: '#FCE4EC',
    icon: <BrushRoundedIcon sx={{ fontSize: 40, color: '#C2185B' }} />,
  },
];

function DashboardPage() {
  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        overflowY: 'auto',
        py: '28px',
        px: '28px',
      }}
    >
      {/* 페이지 헤더 */}
      <Box sx={{ mb: 3 }}>
        <Typography variant='h1' sx={{ mb: '6px', color: '#1A1A1A' }}>
          My Courses
        </Typography>
        <Typography variant='body1' color='text.secondary'>
          총{' '}
          <Box component='span' sx={{ fontWeight: 600, color: '#E63012' }}>
            {COURSES.length}개
          </Box>
          의 코스가 등록되어 있습니다.
        </Typography>
      </Box>

      {/* 필터 바 */}
      <FilterBar />

      {/* 코스 카드 목록 */}
      <Grid container spacing={2}>
        {COURSES.map((course) => (
          <Grid key={course.id} size={{ xs: 12, xl: 6 }}>
            <CourseCard
              title={course.title}
              description={course.description}
              instructor={course.instructor}
              iconBg={course.iconBg}
              icon={course.icon}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default DashboardPage;
