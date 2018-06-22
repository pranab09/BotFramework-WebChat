import { css } from 'glamor';
import classNames from 'classnames';
import React from 'react';

import ActivityComposer from './Activity/Composer';
import BasicCard from './Activity/Card/BasicCard';
import BasicMultipleCardActivity from './Activity/BasicMultipleCardActivity';
import BasicSingleCardActivity from './Activity/BasicSingleCardActivity';
import CardComposer from './Activity/Card/Composer';
import Composer from './Composer';
import MainContext from '../Context';
import TranscriptContext from './Context';

const ROOT_CSS = css({
  display: 'flex',
  flexDirection: 'column',

  '& > .filler': {
    flex: 1
  },

  '& > ul': {
    listStyleType: 'none'
  }
});

export default props =>
  <MainContext.Consumer>
    { ({ styleSet }) =>
      <Composer>
        <TranscriptContext.Consumer>
          { ({ activities }) =>
            <div className={ classNames(ROOT_CSS + '', styleSet.activities + '', (props.className || '') + '') }>
              <div className="filler" />
              <ul>
                {
                  activities.map(activity =>
                    <li
                      className={ styleSet.activity }
                      key={ activity.id }
                    >
                      <ActivityComposer activity={ activity }>
                        {
                          // Currently, we do not support multiple card originated from the user
                          activity.cards.length === 1 || activity.from === 'user' ?
                            <BasicSingleCardActivity>
                              { card =>
                                <BasicCard card={ card }>
                                  { props.children }
                                </BasicCard>
                              }
                            </BasicSingleCardActivity>
                          :
                            <BasicMultipleCardActivity>
                              { card =>
                                <BasicCard card={ card }>
                                  { props.children }
                                </BasicCard>
                              }
                            </BasicMultipleCardActivity>
                        }
                      </ActivityComposer>
                    </li>
                  )
                }
              </ul>
            </div>
          }
        </TranscriptContext.Consumer>
      </Composer>
    }
  </MainContext.Consumer>
