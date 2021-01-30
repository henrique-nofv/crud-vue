<template>
  <div>
    <header-component title='Henrique Noronha Favorette'>
      <template v-slot:headLine>
        <router-link tag='span' class="ml-n3" to='/'>
          <v-btn color='primary' small text> Voltar </v-btn>
        </router-link>
      </template>
      <template v-slot:actions>
        <v-row v-if='isDetailUser' class='mt-3 mb-1 flex-row-reverse'>
          <v-btn
            v-if='readOnlyMode'
            depressed
            max-width='150px'
            class='primary mr-3'
            @click='edit'
            >Editar</v-btn
          >
          <v-btn
            v-else
            depressed
            max-width='150px'
            class='success mr-3'
            @click='updateUser'
            >Atualizar</v-btn
          >
          <v-btn depressed max-width='150px' class='error mr-3'>Excluir</v-btn>
        </v-row>
      </template>
    </header-component>
    <v-container tag='section' class='d-flex flex-row flex-wrap white'>
      <v-row>
        <v-col cols='12' sm='6' md='6' xl='6'>
          <v-img
            alt='Foto do usuário'
            max-height='400px'
            src='https://ciclesradar.com.br/images/sem_foto.png'
          />
        </v-col>
        <v-col cols='1'>
          <v-divider vertical />
        </v-col>
        <v-col
          cols='12'
          sm='5'
          md='5'
          xl='5'
          style='max-height: 400px'
          class='overflow-y-auto'
        >
          <v-form
            ref='form'
            :v-model='valid'
            style='width: 100%'
            lazy-validation
          >
            <h1 class='headline'>Dados cadastrais</h1>
            <v-divider class='mb-5'></v-divider>
            <v-text-field
              :readonly='readOnlyMode'
              v-model='user.name'
              :rules='nameRules'
              label='Nome *'
              required
            ></v-text-field>

            <v-text-field
              v-model='user.email'
              :rules='emailRules'
              label='Email'
              required
              :readonly='readOnlyMode'
            ></v-text-field>
            <v-select
              v-model='user.typePerson'
              :items='typePerson'
              :rules='[(v) => !!v || `Item is required`]'
              label='Tipo'
              required
              :readonly='readOnlyMode'
            ></v-select>

            <v-text-field
              v-if='select'
              v-model='user.cpfCnpj'
              :rules='emailRules'
              :label='select == `Pessoa física` ? `Cpf` : `Cnpj`'
              required
              :readonly='readOnlyMode'
            ></v-text-field>

            <v-select
              v-if='select == `Pessoa física`'
              v-model='user.genre'
              :items='genreList'
              :rules='[(v) => !!v || `Item is required`]'
              label='Genêro'
              required
              :readonly='readOnlyMode'
            ></v-select>

            <v-text-field
              v-if='select == `Pessoa física`'
              v-model='user.birthdate'
              :rules='emailRules'
              label='Data de nascimento'
              required
              :readonly='readOnlyMode'
            ></v-text-field>

            <v-text-field
              v-if='select == `Pessoa jurídica`'
              v-model='user.companyName'
              :rules='emailRules'
              label='Razão social'
              required
              :readonly='readOnlyMode'
            ></v-text-field>

            <v-text-field
              v-model='user.phoneFixed'
              label='Telefone fixo'
              :readonly='readOnlyMode'
            ></v-text-field>

            <v-text-field
              v-model='user.phoneMobile'
              label='Telefone celular'
              :readonly='readOnlyMode'
            ></v-text-field>

            <v-text-field
              v-model.lazy='user.photo'
              label='Foto (URL)'
              :readonly='readOnlyMode'
            ></v-text-field>

            <div
              v-for='(address, index) in user.fullAddress'
              :key='address.cep + index'
            >
              <h1 class='headline mt-5'>Endereço</h1>

              <v-divider class='mb-5' />

              <v-text-field
                v-model.lazy='address.cep'
                label='Cep'
                :readonly='readOnlyMode'
              ></v-text-field>

              <v-text-field
                v-model.lazy='address.address'
                label='Endereço'
                :readonly='readOnlyMode'
              ></v-text-field>

              <v-text-field
                v-model.lazy='address.number'
                label='Número'
                :readonly='readOnlyMode'
              ></v-text-field>

              <v-text-field
                v-model.lazy='address.complement'
                label='Complemento'
                :readonly='readOnlyMode'
              ></v-text-field>

              <v-text-field
                v-model.lazy='address.neighborhood'
                label='Bairro'
                :readonly='readOnlyMode'
              ></v-text-field>

              <v-text-field
                v-model.lazy='address.city'
                label='Cidade'
                :readonly='readOnlyMode'
              ></v-text-field>

              <v-text-field
                v-model.lazy='address.state'
                label='Estado'
                :readonly='readOnlyMode'
              ></v-text-field>
            </div>
            <v-btn color='primary' @click='addAddress' small text>
              + Endereço
            </v-btn>
          </v-form>
          <v-btn class="success">Cadastrar</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import { mapState } from 'vuex';

export default {
  components: {
    HeaderComponent: Header,
  },
  mounted() {
    if (this.isDetailUser) {
      this.$store.dispatch('getUser', this.$route.params.id);
      this.readOnlyMode = true;
    }
  },
  data: () => ({
    readOnlyMode: false,
    valid: true,
    typePerson: ['Pessoa física', 'Pessoa jurídica'],
    genreList: ['Feminino', 'Masculino'],
    nameRules: [
      (v) => !!v || 'Name is required',
      (v) => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    select: null,
  }),
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
    isDetailUser() {
      if (typeof this.$route.params.id !== 'undefined') {
        if (this.$route.params.id.length) {
          return true;
        }
        return false;
      }
      return false;
    },
  },
  beforeDestroy() {
    this.$store.commit('setUser', {});
  },
  methods: {
    edit() {
      this.readOnlyMode = false;
    },
    updateUser() {
      this.readOnlyMode = true;

      this.$store.dispatch('updateUser', this.user);
    },
    addAddress() {
      this.user.fullAddress.push({
        cep: '',
        city: '',
        complement: '',
        number: '',
        neighborhood: '',
        address: '',
        state: '',
      });
    },
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>

<style lang='scss'>
.card-pointer {
  cursor: pointer;
}
</style>
