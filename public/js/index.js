(function( $ ) {
    $(function() {
        var $form = $( "#email-form" );
        $form.on( "submit", function( e ) {
            e.preventDefault();
            $form.find( ".alert" ).remove();
            $.post( "/validate", $form.serialize(), function( res ) {
                var msg = res.valid ? '<div class="alert alert-success">E-mail valida</div>' : '<div class="alert alert-danger">E-mail non valida</div>';
                $form.append( msg );
            });
        });
    });
})( jQuery );