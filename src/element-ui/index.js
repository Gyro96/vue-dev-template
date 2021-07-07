import {
  Button,
  Select,
  Container,
  Header,
  Aside,
  Main,
  Footer,
} from "element-ui";

const components = [Button, Select, Container, Header, Aside, Main, Footer];

export default {
  install: (Vue) => {
    components.forEach((component) => {
      Vue.use(component);
    });
  },
};
