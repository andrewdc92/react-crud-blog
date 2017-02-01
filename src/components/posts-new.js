import _ from 'lodash';
import React, { Component, PropTypes} from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

const FIELDS = {
  title: {
    type: 'input',
    label: 'Title for Post'
  },
  categories: {
    type: 'input',
    label: 'Enter a few categories for this post'
  },
  content: {
    type: 'textarea',
    label: 'Post Contents'
  }
};
// '['title', 'categories', 'content']'

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

  renderField(fieldConfig, field) {
    const fieldHelper = this.props.fields[field];

    return (
      <div className={`form-group ${fieldHelper.touched && fieldHelper.invalid ? 'has-danger' : ''}`}>
        <label>{fieldConfig.label}</label>
        <fieldConfig.type type="text" className="form-control" {...fieldHelper} />
        <div className="text-help">
          {fieldHelper.touched ? fieldHelper.error : ''}
        </div>
      </div>
    );
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      // form needs an action creator to receive the properties off of the form
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
      <h3> Create a New Post</h3>
      {_.map(FIELDS, this.renderField.bind(this))}
      <button type="submit" className="btn btn-primary">Submit</button>
      <Link to="/" className="btn btn-danger">Cancel</Link>
    </form>
    );
  }
}

function validate(values) {
  const errors = {};
  _.each(FIELDS, (type, field) => {
    if (!values[field]) {
      errors[field] = `Enter ${field}`;
    }
  });

  return errors;
}
//connect: 1st argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm, 1st is form config, 2nd is mapStateToProps, 3rd, is mapDispatchToProps
export default reduxForm({
  form: 'PostsNewForm',
  fields: _.keys(FIELDS),
  validate
})(PostsNew);
//redux form can be used just like connect to inject action creators into component, and create a container
// out of the component.
