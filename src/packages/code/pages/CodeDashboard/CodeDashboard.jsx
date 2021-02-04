import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams, useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { usePaths } from 'modules/packages';
import useSections, {
  idFromSection,
} from 'modules/utilities/hooks/useSections';
import PreviousExperience, {
  workPeriodsToStr,
} from './blocks/PreviousExperience';
import Skills, { useSkillsQuery } from './blocks/Skills';
import Contacts from './blocks/Contacts';
import experience from './experience.json';

const SECTIONS = {
  ABOUT: 'about',
  JOBS: 'jobs',
  WORKS: 'works',
  ARTICLES: 'articles',
  PRESENTATIONS: 'presentations',
  SKILLS: 'skills',
  CONTACTS: 'contacts',
};

const useStyles = makeStyles(theme => ({
  section: {
    marginBottom: theme.spacing(4),
    scrollSnapMarginTop: '128px',
    scrollMarginTop: '128px',
    '&:last-child': {
      minHeight: '50vh',
    },
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionHeaderDetails: {
    paddingRight: '32px',
  },
  skillsQueryControls: {
    display: 'flex',
  },
  about: {
    display: 'flex',
  },
  avatar: {
    float: 'right',
    shapeOutside: 'circle(50%)',
    shapeMargin: '12px',
    height: '256px',
    width: '256px',
  },
  [theme.breakpoints.down('xs')]: {
    avatar: {
      float: 'none',
      margin: '0 auto',
    },
    title: {
      textAlign: 'center',
    },
  },
}));

export default function CodeDashboard() {
  const classes = useStyles();
  const {
    code: { entry: codeEntryPath },
    main,
  } = usePaths();

  const isCVMode = !main;
  const { section } = useParams();
  const history = useHistory();

  const { skillsQuery, skillsQueryControlsNode } = useSkillsQuery();

  useSections({
    section: section || SECTIONS.ABOUT,
    onSectionChange: nextSection => {
      history.replace(
        codeEntryPath.toUrl(
          nextSection === SECTIONS.ABOUT ? undefined : { section: nextSection },
        ),
      );
    },
  });

  return (
    <>
      <div className={classes.section} id={idFromSection(SECTIONS.ABOUT)}>
        <Avatar
          className={classes.avatar}
          alt="My photo on dev conference"
          src="https://res.cloudinary.com/dc2eke0gj/image/upload/s--JrOLNneh--/c_scale,h_512/v1604960394/avatars/3LG_8070_lwuxw9_c6xxx5.jpg"
        />
        <Typography className={classes.title} variant="h2">
          Руководитель команды разработки
        </Typography>
        <ReactMarkdown source={experience.about.description.join('\n\n')} />
      </div>
      <div className={classes.section} id={idFromSection(SECTIONS.JOBS)}>
        <div className={classes.sectionHeader}>
          <Typography variant="h2" gutterBottom={true}>
            Опыт
          </Typography>
          <Typography
            className={classes.sectionHeaderDetails}
            variant="h6"
            color="textSecondary"
          >
            {workPeriodsToStr(experience.jobs)}
          </Typography>
        </div>
        <PreviousExperience jobs={experience.jobs} skills={experience.skills} />
      </div>
      <div className={classes.section} id={idFromSection(SECTIONS.SKILLS)}>
        <div className={classes.sectionHeader}>
          <Typography variant="h2" gutterBottom={true}>
            Навыки
          </Typography>
          <div className={classes.skillsQueryControls}>
            {skillsQueryControlsNode}
          </div>
        </div>
        <Skills skills={experience.skills} query={skillsQuery} />
      </div>
      <div className={classes.section} id={idFromSection(SECTIONS.CONTACTS)}>
        <Typography variant="h2" gutterBottom={true}>
          Контакты
        </Typography>
        <Contacts isCVMode={isCVMode} />
      </div>
    </>
  );
}
