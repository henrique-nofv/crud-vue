<template>
  <div>
    <header-component :title='user.name.length > 2 ? user.name : `Novo usuário`'>
      <template v-slot:headLine>
        <router-link tag='span' class='ml-n3' to='/'>
          <v-btn color='primary' small text>
            <v-icon>mdi-chevron-left</v-icon>
            Voltar
          </v-btn>
        </router-link>
      </template>
      <template v-slot:actions>
        <v-row v-if='isDetailUser' class='mt-3 mb-1 flex-row-reverse'>
          <v-btn
            :loading='loading'
            v-if='readOnlyMode'
            depressed
            max-width='150px'
            class='primary mr-3'
            @click='edit'
            >Editar</v-btn
          >
          <v-btn
            :loading='loading'
            v-else
            depressed
            max-width='150px'
            class='success mr-3'
            @click='updateUser'
            >Atualizar</v-btn
          >
          <v-btn
            :loading='loading'
            depressed
            max-width='150px'
            @click='removeUser'
            class='error mr-3'
            >Excluir</v-btn
          >
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
              label='Nome *'
              :rules="requiredRules"
            ></v-text-field>

            <v-text-field
              v-model='user.email'
              label='Email'
              :rules="user.email.length >= 1 ? emailRules : ''"
              :readonly='readOnlyMode'
            ></v-text-field>

            <v-select
              v-model='user.typePerson'
              :items='typePersonList'
              label='Tipo *'
              required
              :rules="requiredRules"
              :readonly='readOnlyMode'
            ></v-select>

            <v-text-field-cpf
              v-if="user.typePerson == `Pessoa física`"
              v-model='user.cpfCnpj'
              v-bind:label="user.typePerson == `Pessoa física` ? `Cpf *` : `Cnpj *`"
              v-bind:properties="{
                required: true,
                readonly: readOnlyMode,
                rules: user.typePerson == `Pessoa física` ? requiredRules : '',
              }"
              v-bind:options="{
                inputMask: '###.###.###-##',
                outputMask: '###########',
                empty: null,
                applyAfter: true,
              }"
            />

            <v-text-field-cnpj
              v-if="user.typePerson == `Pessoa jurídica`"
              v-model='user.cpfCnpj'
              v-bind:label="`Cnpj`"
              v-bind:properties="{
                required: true,
                readonly: readOnlyMode,
                rules: user.typePerson == `Pessoa jurídica` ? requiredRules : '',
              }"
              v-bind:options="{
                inputMask: '##.###.###/####-##',
                outputMask: '##############',
                empty: null,
                applyAfter: true,
              }"
            />

            <v-select
              v-if='user.typePerson == `Pessoa física`'
              v-model='user.genre'
              :items='genreList'
              label='Genêro *'
              required
              :rules="user.typePerson == `Pessoa física` ? requiredRules : ''"
              :readonly='readOnlyMode'
            ></v-select>

            <v-text-field-datetime
              v-if='user.typePerson == `Pessoa física`'
              v-model='user.birthdate'
              v-bind:label="`Data de nascimento *`"
              v-bind:properties="{
                readonly: readOnlyMode,
                required: true,
                rules: user.typePerson == `Pessoa física` ? requiredRules : '',
                'prepend-icon': 'mdi-calendar',
              }"
              v-bind:options="{
                inputMask: 'DD/MM/YYYY',
                empty: null,
              }"
            />

            <v-text-field
              v-if='user.typePerson == `Pessoa jurídica`'
              v-model='user.companyName'
              label='Razão social *'
              :rules="user.typePerson == `Pessoa jurídica` ? requiredRules : ''"
              required
              :readonly='readOnlyMode'
            ></v-text-field>

            <v-text-field-simplemask
              v-model='user.phoneFixed'
              v-bind:label="`Telefone fixo`"
              v-bind:options="{
                readonly: readOnlyMode,
                inputMask: '(##) #####-####',
                outputMask: '###########',
              }"
            />

            <v-text-field-simplemask
              v-model='user.phoneMobile'
              v-bind:label="`Telefone fixo`"
              v-bind:options="{
                readonly: readOnlyMode,
                inputMask: '(##) #####-####',
                outputMask: '###########',
              }"
            />

            <v-text-field
              v-model.lazy='user.photo'
              label='Foto (URL)'
              :readonly='readOnlyMode'
            ></v-text-field>

            <div
              v-for='(address, index) in user.fullAddress'
              :key='index'
            >
              <h1 class='headline mt-5'>Endereço</h1>

              <v-divider class='mb-5' />
              <v-text-field-cep
                @blur='findCep(address.cep, index)'
                v-model='address.cep'
                v-bind:label='`Cep`'
                v-bind:readonly="readOnlyMode"
                v-bind:options='{
                  inputMask: `#####-###`,
                  outputMask: `########`,
                  empty: null,
                  applyAfter: true,
                }'
              />
              <v-text-field
                v-model.lazy='address.address'
                label='Endereço *'
                :rules="requiredRules"
                :readonly='readOnlyMode'
              ></v-text-field>

              <v-text-field
                v-model.lazy='address.number'
                label='Número *'
                :rules="requiredRules"
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
                label='Cidade *'
                :rules="requiredRules"
                :readonly='readOnlyMode'
              ></v-text-field>

              <v-text-field
                v-model.lazy='address.state'
                label='Estado *'
                :rules="requiredRules"
                :readonly='readOnlyMode'
              ></v-text-field>
            </div>
            <v-btn
              :loading='loading'
              class='mb-7'
              color='primary'
              @click='addAddress'
              small
              text
            >
              + Endereço
            </v-btn>
          </v-form>
          <v-row class='flex-row-reverse'>
            <v-btn
              :loading='loading'
              v-if='!isDetailUser'
              class='success mb-7'
              @click='createUser'
              >Cadastrar</v-btn
            >
          </v-row>
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
    loading: false,
    typePerson: '',
    typePersonList: ['Pessoa física', 'Pessoa jurídica'],
    genreList: ['Feminino', 'Masculino'],
    requiredRules: [
      (v) => !!v || 'Campo obrigatório!',
    ],
    emailRules: [
      (v) => /.+@.+\..+/.test(v) || 'Email inválido!',
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
    this.$store.commit('resetUserState');
  },
  methods: {
    async findCep(cep, index) {
      try {
        const response = await this.$store.dispatch('getAddressByCep', cep);

        this.user.fullAddress[index].address = response.data.logradouro;
        this.user.fullAddress[index].neighborhood = response.data.bairro;
        this.user.fullAddress[index].city = response.data.localidade;
        this.user.fullAddress[index].state = response.data.uf;
      } catch (error) {
        console.log('Falha ao buscar cep');
      }
    },
    async removeUser() {
      const response = await this.$fire({
        title: 'Remover',
        cancelButtonText: 'Cancelar',
        text: `Tem certeza que deseja excluir o usuário ${this.user.name}?`,
        showCancelButton: true,
      });

      if (response.value) {
        this.loading = true;
        await this.$store.dispatch('deleteUser', this.user);

        this.$fire({
          title: 'Successo',
          text: `Usuário ${this.user.name} removido com sucesso!`,
          type: 'success',
          timer: 3000,
        }).then(() => window.location.assign('/'));
      }

      this.loading = false;
    },
    edit() {
      this.readOnlyMode = false;
    },
    async createUser() {
      const isValidForm = this.$refs.form.validate();

      if (isValidForm) {
        this.loading = true;

        const response = await this.$store.dispatch('createUser', this.user);

        if (response.status === 200) {
          this.$fire({
            title: 'Criado',
            text: `Usuário ${response.data.name} criado com sucesso!`,
            type: 'success',
            timer: 3000,
          }).then(() => window.location.assign('/'));
        } else {
          this.$fire({
            title: 'Erro',
            text: 'Falha ao criar usuário!',
            type: 'error',
            timer: 3000,
          });
        }

        this.loading = false;
      }
    },
    async updateUser() {
      this.readOnlyMode = true;
      this.loading = true;

      const response = await this.$store.dispatch('updateUser', this.user);

      if (response.status === 200) {
        this.$fire({
          title: 'Atualizado',
          text: `Usuário ${this.user.name} atualizado com sucesso!`,
          type: 'success',
          timer: 3000,
        }).then(() => window.location.assign('/'));
      } else {
        this.$fire({
          title: 'Erro',
          text: 'Falha ao atualizar usuário!',
          type: 'error',
          timer: 3000,
        });
      }

      this.loading = false;
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
  },
};
</script>

<style lang='scss'>
.card-pointer {
  cursor: pointer;
}
</style>
