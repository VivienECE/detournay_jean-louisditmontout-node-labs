import {useRef, useState} from 'react';
import axios from 'axios';
/** @jsx jsx */
import { jsx } from '@emotion/core'
// Layout
import { useTheme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
// Local
import Messages from './Messages'
import MessageSend from './MessageSend'

const useStyles = (theme) => ({
  root: {
    height: '100%',
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
    background: 'rgba(0,0,0,.2)',
    position: 'relative',
  },
  fab: {
    position: 'absolute !important',
    // position: 'fixed !important',
    top: theme.spacing(2),
    // width: '50px',
    // bottom: '0',
    // marginLeft: '100%',
    // bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  fabDisabled: {
    display: 'none !important',
  }
})

export default ({
  channel, messages, addMessage
}) => {
  const styles = useStyles(useTheme())
  const listRef = useRef();
  const channelId = useRef()
  const [scrollDown, setScrollDown] = useState(false)
  const onScrollDown = (scrollDown) => {
    setScrollDown(scrollDown)
  }
  const onClickScroll = () => {
    listRef.current.scroll()
  }
  return (
    <div css={styles.root}>
      <Messages
        channel={channel}
        messages={messages}
        onScrollDown={onScrollDown}
        ref={listRef}
      />
      <MessageSend addMessage={addMessage} channel={channel} />
      <Fab
        color="primary"
        aria-label="Latest messages"
        css={[styles.fab, scrollDown || styles.fabDisabled]}
        onClick={onClickScroll}
      >
        <ArrowDropDownIcon />
      </Fab>
    </div>
  );
}