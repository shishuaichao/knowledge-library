function Component(props, context, updater) {
  this.props = props;
  this.context = context;
  // If a component has string refs, we will assign a different object later.
  // this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  // this.updater = updater || ReactNoopUpdateQueue;
}

class App extends Component {

  constructor(props) {
    super(props)
  }
}

var a = new App()

console.log('props', a,  a.props)