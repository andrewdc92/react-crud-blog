import React, { Component, PropTypes} from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

class PostsNew extends Component {
  static contextTypes = {
    router: PropTypes.object
    //the router should be a clear reminder...i need this ctx object to access the router
  };

  onSubmit(props) {
    this.props.createPost(props)
      .then(() => {
      //blog post has been created -> navigate to index by calling this.context.router.push
      this.context.router.push('/');
    });
    //creats promise as a payload, when it's resolved, it means blog post was sucesfuuly created
  }

  render() {
    const { fields: { title, categories, content}, handleSubmit } = this.props;
    return (
      // form needs an action creator to receive the properties off of the form
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
      <h3> Create a New Post</h3>

      <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
        <label>Title</label>
        <input type="text" className="form-control" {...title} />
        <div className="text-help">
          {title.touched ? title.error : ''}
        </div>
      </div>

      <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
        <label>Categories</label>
        <input type="text" className="form-control" {...categories}/>
        <div className="text-help">
          {categories.touched ? title.error : ''}
        </div>
      </div>

      <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
        <label>Content</label>
        <textarea className="form-control" {...content} />
        <div className="text-help">
          {content.touched ? title.error : ''}
        </div>
      </div>

      <button type="submit" className="btn btn-primary">Submit</button>
      <Link to="/" className="btn btn-danger">Cancel</Link>
    </form>
    );
  }
}

function validate(values) {
  const errors = {};
    if (!values.title) {
      errors.title = "Enter a username";
    }
    if (!values.categories) {
      errors.categories = 'Enter categories';
    }
    if (!values.content) {
      errors.content = 'Enter some content';
    }
  return errors;
}
//connect: 1st argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm, 1st is form config, 2nd is mapStateToProps, 3rd, is mapDispatchToProps
export default reduxForm({
  form: 'PostsNewForm',
  fields: ['title', 'categories', 'content'],
  validate
}, null, { createPost })(PostsNew);
//redux form can be used just like connect to inject action creators into component, and create a container
// out of the component.
