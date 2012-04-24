/* Nitty gritty form validation
 *
 * Called like this: $('#myForm').validateForm(rules, callback, error);
 *
 * Rules should look like this:
 * {'nameOfField': ['rule1', 'rule2', 'rule3']}
 */

( function( $ ) {
	
	var FormValidation = function(rules, form) {
		this.rules = rules;
		this.form = form;
		this.errors = [];
		
		/* Inoccent until error is found */
		this.passing = true;
		
		this.emailFilter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	};
	
	FormValidation.capitalize = function(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
	
	FormValidation.prototype = {
		run: function() {
			// Set passing to true
			this.passing = true;
			
			var formData = this.form.serializeArray();
			for(var i = 0; i < formData.length; i++) {
				if(typeof this.rules[formData[i]['name']] !== 'undefined') {
					var rules = this.rules[formData[i]['name']],
							field = formData[i]['name'],
							value = formData[i]['value'];
							
					console.log(rules, field, value);
							
					for(var j = 0; j < rules.length; j++) {
						this[rules[j]](field, value);
					}
				}
			}
			
			if(this.passing) {
				return true;
			}
			
			return false;
		},
		
		/* Validation Rule Functions go here */
		required: function(field, value) {
			if(value.length === 0) {
				this.passing = false;
				this.errors.push('Das Feld ' + FormValidation.capitalize(field) + ' ist erforderlich');
			}
		},
		
		validEmail: function(field, value) {			
			if(!this.emailFilter.test(value)) {
				this.passing = false;
				this.errors.push(FormValidation.capitalize(field) + ' enthält keine gültige E-Mail Adresse');
			}
		}
	};
	
	$.fn.validateForm = function(rules, success, error) {
		var validation = new FormValidation(rules, this);
		
		this.bind('submit', function() {
			if(validation.run()) {
				// Calling the callback, passing in the form object as argument
				success(validation.form);
			} else {
				// Calling the error callback passing the form and the validation errors
				error(validation.form, validation.errors);
			}
			
			// Prevent the form from being actually submitted
			return false;
		});
	};
})( window.jQuery );