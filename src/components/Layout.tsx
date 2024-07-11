import { theme } from "antd";
import Layout, { Content, Footer, Header } from "antd/es/layout/layout";
import { PropsWithChildren } from "react";

function EditorLayout({ children }: PropsWithChildren) {
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken();

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}></Header>
      <Content
        style={{ padding: 48 }}>
        <div style={{ background: colorBgContainer, minHeight: 280, padding: 24, borderRadius: borderRadiusLG }}>
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
