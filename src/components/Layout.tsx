import { theme } from "antd";
import Layout, { Content, Footer, Header } from "antd/es/layout/layout";
import { CSSProperties, PropsWithChildren } from "react";

const styles: Record<string, CSSProperties> = {
  header: {
    display: 'flex',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 21,
    padding: '0 24px',
    justifyContent: 'space-between',
  },
  content: {
    // marginTop: 104,
    // marginBottom: 50,
    padding: '104px 30px 50px 30px',
    height: 'calc(100vh - 70px)',
    boxSizing: 'border-box',
  },
  contentChild: {
    width: '100%',
    height: '100%',
  },
};

function EditorLayout({ children }: PropsWithChildren) {
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken();

  return (
    <Layout>
      <Header style={styles.header}></Header>
      <Content
        style={styles.content}>
        <div style={{ background: colorBgContainer, borderRadius: borderRadiusLG, ...styles.contentChild }}>
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Image movable test
      </Footer>
    </Layout>
  );
}

export default EditorLayout;
