import React, { useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import MineEditor, {
  useEditorState,
  exportContentFromState,
  RenderContent,
} from 'modules/MineEditor';
import transliteration from './transliteration';

const useStyles = makeStyles({
  articleBody: {
    marginTop: '12px',
  },
});

export default function ArticleEditorForm({
  initialArticle,
  onSubmit,
  isSubmitting,
}) {
  const classes = useStyles();
  const [isInViewMode, setIsInViewMode] = useState(false);
  const handleToggleViewMode = useCallback(
    () => setIsInViewMode(prevIsInViewMode => !prevIsInViewMode),
    [],
  );

  const isCreation = !initialArticle;

  const {
    title: initialTitle = 'Новая статья',
    isDraft: initialIsDraft = true,
    body: initialContent,
  } = initialArticle || {};

  const [{ slug, hasSlug }, setSlug] = useState({});
  const [title, setTitle] = useState(initialTitle);
  const [isDraft, setIsDraft] = useState(initialIsDraft);
  const { editorState, setEditorState } = useEditorState(initialContent);

  return (
    <Grid container={true} spacing={3} alignItems="center">
      <Grid item={true} xs={4}>
        <FormControl>
          <InputLabel htmlFor="component-simple">Название статьи</InputLabel>
          <Input
            id="component-simple"
            value={title}
            onChange={event => {
              setTitle(event.currentTarget.value);
              if (!hasSlug) {
                setSlug({
                  slug: toSlug(event.currentTarget.value),
                  hasSlug: false,
                });
              }
            }}
          />
        </FormControl>
      </Grid>
      {isCreation && (
        <Grid item={true} xs={4}>
          <FormControl fullWidth={true}>
            <InputLabel htmlFor="component-simple" shrink={Boolean(slug)}>
              Slug
            </InputLabel>
            <Input
              id="component-simple"
              value={slug}
              onChange={event =>
                setSlug({
                  slug: toSlug(event.currentTarget.value),
                  hasSlug: true,
                })
              }
            />
          </FormControl>
        </Grid>
      )}
      <Grid item={true} xs={4}>
        <FormControlLabel
          control={
            <Checkbox
              checked={isDraft}
              onChange={event => setIsDraft(event.target.checked)}
            />
          }
          label="Черновик"
        />
      </Grid>
      <Grid item={true} xs={4}>
        {isSubmitting ? (
          <Typography variant="caption">Идет сохранение...</Typography>
        ) : (
          <Button
            disabled={isCreation && !slug}
            onClick={() =>
              onSubmit({
                title,
                isDraft,
                body: exportContentFromState(editorState),
                slug: isCreation ? slug : undefined,
              })
            }
          >
            Сохранить
          </Button>
        )}
      </Grid>
      <Grid item={true} xs={12}>
        <FormControlLabel
          className={classes.toggleContainer}
          control={
            <Switch
              name="viewMode"
              checked={isInViewMode}
              onChange={handleToggleViewMode}
            />
          }
          label="Режим просмотра"
        />
      </Grid>
      <Grid item={true} xs={12}>
        <div className={classes.articleBody}>
          <Typography variant="caption">Текст статьи</Typography>
          {isInViewMode ? (
            <RenderContent data={editorState.getCurrentContent()} />
          ) : (
            <MineEditor
              editorState={editorState}
              setEditorState={setEditorState}
            />
          )}
        </div>
      </Grid>
    </Grid>
  );
}

function toSlug(text) {
  return transliteration(
    text
      .toLowerCase()
      .replace(/\s/g, '_')
      .replace(/[^a-zа-я0-9]/g, ''),
  );
}
