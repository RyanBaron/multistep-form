<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Insightly Multi-Step Test</title>
		<link rel="stylesheet" type="text/css" href="style.css">
		<script src="https://code.jquery.com/jquery-2.1.3.js" integrity="sha256-goy7ystDD5xbXSf+kwL4eV6zOPJCEBD1FBiCElIm+U8=" crossorigin="anonymous"></script>
		<script src="script.js"></script>
	</head>
	<body>
		<div class="multistep-form__wrapper">
			<div class="multistep-form_inside">
				<form name="insightly_web_to_lead" action="" method="post" data-insightly="multistep">
					<input type="hidden" name="formId" value="u6mbZxM3jc5xM9/8SWjCVQ==" />
					<fieldset data-next-text="Get Some!">
						<div class="fieldset-title">Page 1</div>
						<div class="field__wrapper">
							<label for="insightly_firstName">First Name: </label>
							<input id="insightly_firstName" name="FirstName" type="text"/>
						</div>
						<div class="field__wrapper">
							<label for="insightly_lastName">Last Name: </label>
							<input id="insightly_lastName" name="LastName" type="text"/>
						</div>
						<div class="field__wrapper">
							<label for="insightly_organization">Organization: </label>
							<input id="insightly_organization" name="OrganizationName" type="text"/>
						</div>
					</fieldset>
					<fieldset data-back-text="Previous" data-next-text="Finalize">
						<div class="field__wrapper">
							<label for="email">Email: </label>
							<input id="insightly_Email" name="email" type="text"/>
						</div>
					</fieldset>
					<fieldset data-back-text="Previous" data-next-text="Finalize">
						<div class="field__wrapper">
							<label for="phone">Phone: </label>
							<input id="insightly_Phone" name="phone" type="text"/>
						</div>
						<div class="field__wrapper">
							<label for="insightly_title">Title: </label>
							<input id="insightly_Title" name="Title" type="text"/><br/>
						</div>
						<input type="hidden" id="insightly_ResponsibleUser" name="ResponsibleUser" value="1025914"/>
						<input type="hidden" id="insightly_LeadSource" name="LeadSource" value="685843"/>
					</fieldset>
					<div class="form-controls">
						<div class="form-navigate">
							<a href="#" class='btn btn-prev' data-nav-prev></a>
							<a href="#" class='btn btn-next' data-nav-next></a>
						</div>
						<div class="form-submit">
							<a href="#" class='btn btn-prev' data-nav-prev></a>
							<input type="submit" value="Submit"></form>
						</div>
					</div>
			</div>
		</div>
	</body>
</html>
