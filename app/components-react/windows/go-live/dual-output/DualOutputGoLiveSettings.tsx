import React from 'react';
import styles from './DualOutputGoLive.m.less';
import Scrollable from 'components-react/shared/Scrollable';
import { Services } from 'components-react/service-provider';
import { useGoLiveSettings } from '../useGoLiveSettings';
import { $t } from 'services/i18n';
import { Row, Col } from 'antd';
import { Section } from '../Section';
import PlatformSettings from '../PlatformSettings';
import TwitterInput from '../Twitter';
import OptimizedProfileSwitcher from '../OptimizedProfileSwitcher';
import Spinner from 'components-react/shared/Spinner';
import GoLiveError from '../GoLiveError';
import UserSettingsUltra from './UserSettingsUltra';
import UserSettingsNonUltra from './UserSettingsNonUltra';

/**
 * Renders settings for starting the stream
 * - Platform switchers
 * - Settings for each platform
 * - Extras settings
 **/
export default function DualOutputGoLiveSettings() {
  const { isAdvancedMode, isLoading, isPrime, canUseOptimizedProfile } = useGoLiveSettings().extend(
    module => {
      const { UserService, VideoEncodingOptimizationService } = Services;

      return {
        isPrime: UserService.views.isPrime,

        canUseOptimizedProfile:
          VideoEncodingOptimizationService.state.canSeeOptimizedProfile ||
          VideoEncodingOptimizationService.state.useOptimizedProfile,
      };
    },
  );

  return (
    <Row gutter={16} className={styles.settingsRow}>
      {/*LEFT COLUMN*/}
      <Col span={8} className={styles.leftColumn}>
        <Scrollable style={{ height: '100%' }}>
          {isPrime && <UserSettingsUltra />}
          {!isPrime && <UserSettingsNonUltra />}
        </Scrollable>
      </Col>

      {/*RIGHT COLUMN*/}
      <Col span={16} className={styles.rightColumn}>
        <Spinner visible={isLoading} relative />
        <GoLiveError />
        <Scrollable style={{ height: '100%' }} snapToWindowEdge>
          {/*PLATFORM SETTINGS*/}
          <PlatformSettings />
          {/*ADD SOME SPACE IN ADVANCED MODE*/}
          {isAdvancedMode && <div className={styles.spacer} />}
          {/*EXTRAS*/}
          <Section isSimpleMode={!isAdvancedMode} title={$t('Extras')}>
            <TwitterInput />
            {!!canUseOptimizedProfile && <OptimizedProfileSwitcher />}
          </Section>
        </Scrollable>
      </Col>
    </Row>
  );
}
