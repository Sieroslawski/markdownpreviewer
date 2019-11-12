const renderer = new marked.Renderer();
//Add _blank to links
renderer.link = (href, title, text) => {
  return `<a href = "${href}" target = "_blank" style = "color: green">${href}</a>`;
};

marked.setOptions({
  breaks: true
});

//App is for settings inputs and inserting the markdown
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      inputValue: markdown //Markdown const
    }
    this.handleChange = this.handleChange.bind(this); //Bind 'this'
  }
  handleChange(event) {
    this.setState({
      inputValue: event.target.value
    });    
  }
  render() {
    return (
      <div id='start'>
      <Editor input = {this.state.inputValue} handleChange = {this.handleChange}/> {/*Set states for Editor and Previewer*/}
      <Previewer input = {this.state.inputValue} />
      </div>
    );
  }
}

//Child component 1
class Editor extends React.Component {
  constructor(props) {
    super(props);
  }
 render() {
   return (
     <div id = 'first'>
       <h1 id='title'><i className="fa fa-rocket" aria-hidden="true"></i>Editor:</h1>    
       <textarea id='editor' value={this.props.input} onChange={this.props.handleChange} type='text'/>
       {/*Create Text Area for markdown*/}
     </div>
   );
 }
}
//Child component 2
class Previewer extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    return(
    <div id = 'second'>
        <h1 id='title'><i className="fa fa-rocket" aria-hidden="true"></i>Previewer:</h1>
        <p id='previewer' dangerouslySetInnerHTML = {{__html: marked(this.props.input, {renderer: renderer})}}/>
     </div> //This is dangerous! https://reactjs.org/docs/dom-elements.html
    );
  }
}

const markdown = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
  
Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](http://www.stickpng.com/assets/images/584830e8cef1014c0b5e4aa0.png)`

ReactDOM.render(<App />, document.getElementById("app"));


